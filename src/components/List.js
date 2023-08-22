import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from '../firebase';

function ModModal({ listArr, setListArr, preIndex, item, setShowModModal }) {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const showNewTitle = (e) => {
    setNewTitle(e.target.value);
  }

  const showNewContent = (e) => {
    setNewContent(e.target.value);
  }

  const modList = listArr.find((item, i) => i === preIndex)

  const submitModPost = async (e) => {
    e.preventDefault();
    setNewTitle("");
    setNewContent("");

    setListArr(listArr.map((item) =>
      item.id === modList.id ? { title: newTitle, content: newContent } : item))

    const updateList = doc(db, "list", item.id)
    await updateDoc(updateList, {
      title: newTitle,
      content: newContent
    })

    setShowModModal((change) => !change)
  }
  return (<>
    <form onSubmit={submitModPost}>
      <label htmlFor="newTitle">제목</label>
      <input id="newTitle" placeholder="수정할 제목" type="text" value={newTitle} onChange={showNewTitle}></input>
      <label htmlFor="newContent">내용</label>
      <input id="newContent" placeholder="수정할 내용" type="text" value={newContent} onChange={showNewContent}></input>
      <input type="submit"></input>
    </form>
  </>)
}

function List() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [listArr, setListArr] = useState([]);
  const [showModModal, setShowModModal] = useState(false);

  const showTitle = (e) => {
    setTitle(e.target.value);
  }

  const showContent = (e) => {
    setContent(e.target.value);
  }

  const submitPost = async (e) => {
    e.preventDefault();
    setTitle("");
    setContent("");


    await addDoc(collection(db, "list"), {
      title: title,
      content: content
    });

    setListArr([]);

    await getList();



  }

  const getList = async () => {

    const querySnapshot = await getDocs(collection(db, "list"));

    setListArr(querySnapshot.docs.map((e) => e.data()))


  }

  useEffect(() => {

    getList();

  }, [])

  const delPost = async (index) => {
    const listDoc = doc(db, "list", index.id);
    await deleteDoc(listDoc);
    setListArr(listArr.filter((item, i) => item.id !== index.id))
  }

  const modBtn = () => {
    setShowModModal((change) => !change);
  }
  return (
    <>
      <form onSubmit={submitPost}>
        <label htmlFor="title">제목</label>
        <input id="title" placeholder='제목' value={title} type='text' onChange={showTitle}></input>
        <label htmlFor="content">내용</label>
        <input id="content" placeholder="내용" value={content} type="text" onChange={showContent}></input>
        <input type="submit"></input>
      </form>

      <div>
        <ul>
          {listArr.map((item, i) => {
            return (<>
              <li key={item.id}>ID: {item.id}, title: {item.title}, content: {item.content}
              </li>
              <button onClick={() => delPost(item)}>삭제</button>
              {showModModal ? <ModModal item={item} preIndex={i} listArr={listArr} setListArr={setListArr} setShowModModal={setShowModModal} /> : null}
              <button onClick={modBtn}>{showModModal ? "수정 취소" : "수정하기"}</button>
            </>)
          })}
        </ul>
      </div>
    </>
  )
}

export default List;