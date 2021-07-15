import './TodoCards.css';

import React, { useEffect, useState } from 'react'
import CardComponent from '../CardComponent/CardComponent';
import { getAllTodos, deleteTodo } from './../../apiCalls';
import { toast } from 'react-toastify';
import { Button, Col, Row } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { createTodo } from '../../apiCalls';

function TodoCards() {
	const [todos, setTodos] = useState([]);
	const [todoName, setTodoName] = useState("")
	const [showAdd, setShowAdd] = useState(false)
	const [description, setDescription] = useState("");
	const [toDelete, setToDelete] = useState("")
	const [showDelete, setShowDelete] = useState(false)

	useEffect(() => {
		fetchData();
	}, [])

	const addNewItem = () => {
		const obj = {
			todoName,
			todoDescription: description
		}
		if (Object.values(obj).includes("")) {
			toast.error("All values are required");
		}
		else {
			createTodo(obj).then(x => {
				fetchData();
				setShowAdd(false);
				setDescription("")
				setTodoName("");
			})
		}
	}

	const deleteTodoWithId = (id) => {
		setToDelete(id);
		setShowDelete(true)
	}

	const confirmDelete = () => {
		deleteTodo(toDelete).then(x => {
			fetchData();
			setShowDelete(false)
		})
	}

	const fetchData = () => {
		getAllTodos().then(res => {
			if (res.status == 1) {
				setTodos(res.data);
			}
			else {
				console.log(res.message);
			}
		})
	}

	return (
		<div className="pt-4" >
			<Row className="border-bot mb-4">
				<Col sm="8">
					<h1 className="todo-heading  my-3 text-start">YOUR TODOS</h1>
				</Col>
				<Col className="d-flex align-items-center justify-content-end">
					<Button onClick={() => setShowAdd(true)}><i class="fas mr-2 fa-plus-circle"></i> New Todo</Button>
				</Col>
			</Row>
			{
				todos.map((x, i) => {
					return <CardComponent key={x._id} todoData={x} deleteTodoWithId={deleteTodoWithId} />
				})
			}
			{
				todos.length == 0 && <h2 className="my-5 start-adding">Start Adding New Tasks</h2>
			}


			<Modal
				show={showAdd}
				onHide={() => setShowAdd(false)}
				dialogClassName="modal-90w"
				aria-labelledby="example-custom-modal-styling-titlee"
				centered
			>

				<Modal.Body className="">
					<div className="row mx-0 mt-4 d-flex justify-content-center">
						<label className="form-label p-0">Todo Name</label>

						<input type="text" className="form-control" value={todoName} onChange={(e) => setTodoName(e.target.value)}></input>

						<label className="form-label p-0">Description</label>

						<input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></input>
					</div>

					<div className="row mt-3 mx-0 d-flex justify-content-center">

						<button className="btn btn-primary" onClick={addNewItem} >Save Changes</button>
					</div>
				</Modal.Body>
			</Modal>
			<Modal
				show={showDelete}
				onHide={() => setShowDelete(false)}
				dialogClassName="modal-90w"
				aria-labelledby="example-custom-modal-styling-titlee"
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
		</div >
	)
}

export default TodoCards
