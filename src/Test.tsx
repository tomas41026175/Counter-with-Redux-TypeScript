import React from 'react'
import Counter from './component/Counter'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { RootState } from './store/index'
import { addItem } from './store/slice/cartSlice'

export const Test = () => {
  const dispatch = useDispatch();
  const storeState = useSelector((state: RootState) => state.myCart);

  // nowCount 這個變數，用於計算目前所有 Counter 的總和
  const nowCount = storeState.reduce((total, count) => total + count.tempData.count, 0);

  // 這裡可以用 useMemo 來計算，但是因為只有一個變數，所以用 useMemo 沒有太大意義
  // const nowCount = useMemo(() => {
  //   return storeState.reduce((total, e) => total + e.tempData.count, 0);
  // }, [storeState]);

  const handleAddClick = () => {
    const lastEle = storeState[storeState.length - 1];
    const newId = lastEle.tempData.id + 1;
    const newEle = {
      title: 'data' + newId,
      tempData: {
        id: newId,
        name: lastEle.tempData.name,
        count: 0
      }
    };
    dispatch(addItem(newEle));
  }

  return (
    <>
      <div className='flex items-start w-1/5 mx-auto gap-10 justify-between  max-h-screen'>
        <ControlPanel nowCount={nowCount} onAddClick={handleAddClick} />
        <div className='flex flex-wrap gap-5 mt-8'>
          {storeState.map((e, i) => (
            <Counter tempData={e} title={e.title} key={i} />
          ))}
        </div>
      </div>
    </>
  )
}

//這邊將addCounter的按鈕和nowTotal的數字分開，因為這樣可以避免每次addCounter時，nowTotal也會重新render
type ControlPanelProps = {
  nowCount: number;
  onAddClick: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ nowCount, onAddClick }) => (
  <div className='flex flex-col select-none items-start mt-8 justify-start gap-5'>
    <span>Now Total：{nowCount}</span>
    <button className='flex mx-auto select-none bg-gray-600 border-2 py-1 px-2 text-white rounded-md shadow-md hove:shadow-inner' onClick={onAddClick}>addCounter</button>
  </div>
);