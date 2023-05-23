import { isBefore } from 'date-fns'
import Sequelize, { Model } from 'sequelize'

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date())
          },
        },
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'avatar' })
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    this.hasMany(models.Subscription, {
      foreignKey: 'meetup_id',
      as: 'subscriptions',
    })
  }
}

export default Meetup
