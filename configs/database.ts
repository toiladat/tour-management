import { error } from "console";
import { Sequelize } from "sequelize";
 const sequelize = new Sequelize(
  process.env.DATABASE_NAME, //ten db
  'root', // username
  process.env.DATABSE_PASSWORD,//password
  {
    host:process.env.DATABASE_HOST, //domain
    dialect:'mysql'
  }
 );
 sequelize.authenticate().then(()=>{
  console.log('ket noi thanh cong');
  
 }).catch((er)=>{
  console.error('ket noi that bai ',er)
  
 })

 export default sequelize