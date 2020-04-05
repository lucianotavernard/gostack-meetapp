import Meetup from '../models/Meetup'

class OrganizingController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          association: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    })

    return res.json(meetups)
  }
}

export default new OrganizingController()
