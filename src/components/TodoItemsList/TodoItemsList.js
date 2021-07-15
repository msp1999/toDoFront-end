import './TodoItemsList.css';

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { createTodoItem, deleteTodoItem, getAllTodoItems, updateTodoItem } from '../../apiCalls';
import { useSelector } from 'react-redux';
import TodoItemCard from '../TodoItemCard/TodoItemCard';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { toast } from 'react-toastify';

function TodoItemsList() {
	const { todoId } = useParams();
	const [todoItems, setTodoItems] = useState([])
	const [toDelete, setToDelete] = useState("");
	const [toEdit, setToEdit] = useState("");
	const todoName = useSelector(state => state.todoReducer.selectedTodo.todoName)
	const [show, setShow] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [updateValue, setUpdateValue] = useState("")
	const [newItemValue, setNewItemValue] = useState("")
	const [showAdd, setShowAdd] = useState(false)




	const handleClose = () => setShow(false);
	const handleCloseEdit = () => setShowEdit(false);

	const addNewItem = () => {
		const obj = {
			todoId,
			"todoItemName": newItemValue,
			"completed": false
		}

		if (Object.values(obj).includes("")) {
			toast.error("All values are required");
		}
		else {
			createTodoItem(obj).then(x => {
				fetchData();
				setShowAdd(false);
				setNewItemValue("")
			})
		}
	}
	const confirmDelete = () => {
		deleteTodoItem(toDelete).then(x => {
			if (x.status == 1) {
				toast.error('Item Deleted');
				fetchData();
				handleClose();
			}
		})
	}

	const saveChanges = () => {
		const obj = { todoItemId: toEdit, todoItemName: updateValue }
		if (Object.values(obj).includes("")) {
			toast.error("All values are required");
		}
		else {
			updateTodoItem(obj).then((x) => {
				fetchData();
				setUpdateValue("");
				handleCloseEdit();
			})
		}
	}



	useEffect(() => {
		fetchData();
	}, [])

	const fetchData = () => {
		getAllTodoItems(todoId).then(res => {
			setTodoItems(res.data);
		})
	}


	return (
		<div className="pt-3">
			<div className="row mx-0">
				<Breadcrumb>
					<Breadcrumb.Item ><Link to={`/todos`}>Todos</Link></Breadcrumb.Item>
					<Breadcrumb.Item active>{todoName}</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			{
				todoItems.map(x => {
					return <TodoItemCard key={x._id} todoItem={x} setShow={setShow} setShowEdit={setShowEdit} setToDelete={setToDelete} setToEdit={setToEdit} fetchData={fetchData} />
				})
			}
			{
				todoItems.length == 0 && <h2 className="my-5 start-adding">Start Adding New Tasks</h2>
			}

			<Alert className="row mx-0 display-flex align-items-center  background ">
				<div className="row mx-0 d-flex  align-items-center justify-content-center">
					<button className="btn background" onClick={() => setShowAdd(true)}>	+ Add item</button>
				</div>
			</Alert>


			{/* delete modal */}

			<Modal
				show={show}
				onHide={() => setShow(false)}
				dialogClassName="modal-90w"
				centered
			>

				<Modal.Body className="">
					<div className="row mx-0 mt-4 d-flex justify-content-center">

						<h4 className=" px-4 text-center text-danger">Are you sure you want to delete this item ?</h4>
					</div>
					<div className="row mt-3 mx-0 d-flex justify-content-center">

						<button className="btn btn-danger" onClick={confirmDelete} >Delete</button>
					</div>
				</Modal.Body>
			</Modal>


			{/* edit modal  */}

			<Modal
				show={showEdit}
				onHide={() => setShowEdit(false)}
				dialogClassName="modal-90w"
				aria-labelledby="example-custom-modal-styling-titlee"
				centered
			>

				<Modal.Body className="">
					<div className="row mx-0 mt-4 d-flex justify-content-center">
						<label className="form-label p-0">New Value</label>
						<input type="text" className="form-control" value={updateValue} onChange={(e) => setUpdateValue(e.target.value)}></input>
					</div>

					<div className="row mt-3 mx-0 d-flex justify-content-center">

						<button className="btn btn-primary" onClick={saveChanges} >Save Changes</button>
					</div>
				</Modal.Body>
			</Modal>

			{/* Add New Item  */}
			<Modal
				show={showAdd}
				onHide={() => setShowAdd(false)}
				dialogClassName="modal-90w"
				aria-labelledby="example-custom-modal-styling-titlee"
				centered
			>

				<Modal.Body className="">
					<div className="row mx-0 mt-4 d-flex justify-content-center">
						<label className="form-label p-0">New Item Name</label>
						<input type="text" className="form-control" value={newItemValue} onChange={(e) => setNewItemValue(e.target.value)}></input>
					</div>

					<div className="row mt-3 mx-0 d-flex justify-content-center">

						<button className="btn btn-primary" onClick={addNewItem} >Save Changes</button>
					</div>
				</Modal.Body>
			</Modal>

		</div>
	)
}

export default TodoItemsList
