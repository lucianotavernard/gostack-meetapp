import File from '../models/File'
import Meetup from '../models/Meetup'

class OrganizingController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    })

    return res.json(meetups)
  }
}

export default new OrganizingController()
