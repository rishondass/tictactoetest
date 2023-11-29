
type Props = {
  index: number;
  value: string;
  selectSquare: (index:number,value:string)=>void;
};

function Square({value,index,selectSquare}: Props) {
  return <button onClick={()=>(selectSquare(index,value))} className="text-3xl p-4 w-20 h-20 bg-blue-300">
    {value}
  </button>;
  
}

export default Square;
