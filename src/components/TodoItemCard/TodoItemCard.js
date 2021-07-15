import React from 'react'
import { useState } from 'react'
import "./TodoItemCard.css"
import Alert from 'react-bootstrap/Alert'
import { updateTodoItem } from '../../apiCalls';
import { toast } from 'react-toastify';
import Badge from 'react-bootstrap/Badge'





function TodoItemCard({ todoItem, setShow, setShowEdit, setToDelete, setToEdit, fetchData }) {
	const [variant, setVariant] = useState(todoItem.completed);

	const handleClose = () => setShow(false);
	const handleCloseEdit = () => setShowEdit(false);

	function handleClick() {
		setVariant(!variant)

		updateTodoItem({ todoItemId: todoItem._id, completed: !variant }).then(x => {
			fetchData();
		})
	}


	return (
		<div>

			<Alert variant={variant ? 'success' : 'danger'} className="row mx-0 display-flex align-items-center ">
				<div className="col-2">
					<input type="checkbox" className="checkbox" checked={todoItem.completed} onChange={handleClick}></input>
					<small className={todoItem.completed ? "text-success pill-green" : "text-danger pill-red"}>{todoItem.completed ? "Completed" : "Pending"}</small>
				</div>
				<div className="col-8">
					{todoItem.todoItemName}
				</div>
				<div className="col-2">
					<div className="row mx-0 d-flex justify-content-end">
						<div className="btn w-auto" onClick={() => {
							setToDelete(todoItem._id)
							setShow(true)
						}}><i class="fas fa-trash-alt text-red"></i></div>
						<div className="btn w-auto" onClick={() => {
							setToEdit(todoItem._id);
							setShowEdit(true);
						}}><i class="fas fa-pencil-alt text-blue"></i></div>
					</div>
				</div>
			</Alert>

		</div>

	)
}

export default TodoItemCard;
