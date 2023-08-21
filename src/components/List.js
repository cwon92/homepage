import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from '../firebase';

function List() {
  const [title, setTitle] = useState("");
  const [listArr, setListArr] = useState([]);

  const showTitle = (e) => {
    setTitle(e.target.value);
  }

  const submitPost = async(e) => {
    e.preventDefault();
    setTitle("");

    await addDoc(collection(db, "list"), {
      title: title
    });
    
    setListArr([]);
    console.log(listArr)

    await getList();

    console.log(listArr)
  }

  const getList = async () => {

    const querySnapshot = await getDocs(collection(db, "list"));

    querySnapshot.forEach((doc) => {
    setListArr([...listArr, {...doc.data(), id: doc.id}])
    });
  }

  useEffect( () => {
    
    getList();
    
  }, [])

  return(
    <>
    <form onSubmit={submitPost}>
      <label htmlFor="title">제목</label>
      <input id="title" placeholder='제목' value={title} type='text' onChange={showTitle}></input>
      <input type="submit"></input>
    </form>

    <div>
      <ul>
        {listArr.map( (item, i) => {
          return (<>
            <li key={item.id}>ID: {item.id}, title: {item.title}
            </li>
          </>)
        })}
      </ul>
    </div>
    </>
  )
}

export default List;