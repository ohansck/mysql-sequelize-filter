import { Sequelize, Model, DataTypes, Op } from 'sequelize';
import { config } from './config';

export const sequelize = new Sequelize({
  'username': config.username,
  'password': config.password,
  'database': config.database,
  host: config.host,
  'dialect': 'mysql',
});

// Define the 'orders' model
class Order extends Model {
  public orderNumber!: number;
  public orderDate!: Date;
  public status!: string;
}

Order.init(
  {
    orderNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    orderDate: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    //Replace modelName and tableName with yours
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false,
  }
);

export async function searchOrders(options: {
  orderNumber?: number;
  startDate?: Date;
  endDate?: Date;
  status?: string;
}) {
  const whereClause: any = {};

  if (options.orderNumber) {
    whereClause.orderNumber = options.orderNumber;
  }

  if (options.startDate && options.endDate) {
    whereClause.orderDate = {
      [Op.between]: [options.startDate, options.endDate],
    };
  }

  if (options.status) {
    whereClause.status = options.status;
  }

  const searchResult = await Order.findAll({
    where: whereClause,
  });

  return searchResult;
}