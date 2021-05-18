module.exports = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
  host: 'ec2-3-234-85-177.compute-1.amazonaws.com',
  username: 'rrsobbyoqjlbje',
  password: '58f1671268656f88620f5eddd5b4ffe425cfafeb796794a6c38e1603c8926a1d',
  database: 'dc84e1t7tnnike',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
