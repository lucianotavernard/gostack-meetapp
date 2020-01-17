import { Op } from 'sequelize'

import User from '../models/User'
import File from '../models/File'
import Meetup from '../models/Meetup'
import Subscription from '../models/Subscription'

import Queue from '../../lib/Queue'
import SubscriptionMail from '../jobs/SubscriptionMail'

class SubscriptionController {
  async index(req, res) {
    const page = req.query.page || 1

    const total = await Subscription.count({
      where: {
        user_id: req.userId,
      },
    })

    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id', 'created_at'],
      include: [
        {
          model: Meetup,
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'email'],
            },
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
          where: {
            date: {
              [Op.gte]: new Date(),
            },
          },
        },
      ],
      limit: 10,
      offset: 10 * page - 10,
      order: [[Meetup, 'date']],
    })

    return res.json({ subscriptions, total })
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId, {
      attributes: ['name', 'email'],
    })

    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    })

    if (!meetup) return res.status(400).json({ error: 'Meetup not found' })

    const subscribed = await Subscription.findOne({
      where: { meetup_id: meetup.id, user_id: req.userId },
    })

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: 'You cannot subscribe to your meetups' })
    }

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: 'You cannot subscribe to past meetups' })
    }

    if (subscribed) {
      return res
        .status(400)
        .json({ error: 'You cannot subscribe to meetups already subscribed' })
    }

    const checkSubscription = await Subscription.findOne({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    })

    if (checkSubscription) {
      return res
        .status(400)
        .json({ error: 'You cannot subscribe for two meetups at once' })
    }

    const subscription = await Subscription.create({
      user_id: req.userId,
      meetup_id: meetup.id,
    })

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    })

    return res.json(subscription)
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id, {
      where: { user_id: req.userId },
    })

    if (!subscription) {
      return res.status(401).json({ error: 'Subscription not found' })
    }

    if (subscription.past) {
      return res
        .status(400)
        .json({ error: "Can't remove previous subscriptions." })
    }

    await subscription.destroy()

    return res.send()
  }
}

export default new SubscriptionController()
