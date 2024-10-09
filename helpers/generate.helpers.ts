export const generateOrderCode= (number:number):string=>{
  const code=  `OD${String(number).padStart(8,'0')}`
  return code
}