import { Op } from 'sequelize'
import { isBefore, startOfDay, endOfDay, parse } from 'date-fns'

import User from '../models/User'
import File from '../models/File'
import Meetup from '../models/Meetup'

class MeetupController {
  async index(req, res) {
    const queryDate = req.query.date ? parse(req.query.date) : new Date()
    const page = req.query.page || 1

    const total = await Meetup.count({
      user_id: {
        [Op.ne]: req.userId,
      },
    })

    const where = {
      user_id: {
        [Op.ne]: req.userId,
      },
      ...(req.query.date && {
        date: {
          [Op.between]: [startOfDay(queryDate), endOfDay(queryDate)],
        },
      }),
    }

    const meetups = await Meetup.findAll({
      where,
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
      limit: 5,
      offset: 5 * page - 5,
    })

    return res.json({ meetups, total })
  }

  async show(req, res) {
    const { id } = req.params

    const meetup = await Meetup.findByPk(id, {
      where: {
        user_id: req.userId,
      },
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
    })

    if (!meetup) return res.status(401).json({ error: 'Meetup not found' })

    return res.json(meetup)
  }

  async store(req, res) {
    const { date } = req.body

    if (isBefore(parse(date), new Date())) {
      return res.status(400).json({ error: 'Meetup date invalid' })
    }

    const meetup = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    })

    return res.json(meetup)
  }

  async update(req, res) {
    const meetupExists = await Meetup.findByPk(req.params.id, {
      where: {
        user_id: req.userId,
      },
    })

    if (!meetupExists) {
      return res.status(401).json({ error: 'Meetup not found' })
    }

    if (isBefore(parse(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Meetup date invalid' })
    }

    if (meetupExists.past) {
      return res.status(400).json({ error: "Can't update previous meetups." })
    }

    await meetupExists.update(req.body)

    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    })

    return res.json(meetup)
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      where: { user_id: req.userId },
    })

    if (!meetup) {
      return res.status(401).json({ error: 'Meetup not found' })
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't remove previous meetups." })
    }

    await meetup.destroy()

    return res.send()
  }
}

export default new MeetupController()
