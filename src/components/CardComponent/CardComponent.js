
import { Card, Row } from 'react-bootstrap';
import './CardComponent.css';
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { saveTodoData } from './../../Redux/actionCreators/todoActions';
import { deleteTodo } from './../../apiCalls';



function CardComponent({ todoData, deleteTodoWithId }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(saveTodoData(todoData))
		history.push(`/todos/${todoData._id}`);
	}

	return (
		<div className="btn col-3 p-2">
			<Card className="card-background ">

				<Card.Header className=" px-4  d-flex justify-content-between align-items-center header-bg">

					<p className="mb-0">
						{todoData.todoName}
					</p>
				</Card.Header>
				<Card.Body className="body-bg px-4 text-start">
					<Card.Text>
						{todoData.todoDescription}
					</Card.Text>


				</Card.Body>
				<Card.Footer className="footer-bg px-4 mb-1">
					<div className="ml-auto d-flex justify-content-between align-items-center mr-2">
						<i class="fas fa-trash-alt delete-todo text-red" onClick={() => deleteTodoWithId(todoData._id)}></i>
						<p className="text-blue m-0">

							<i onClick={handleClick} className="far fa-lg icon fa-arrow-alt-circle-right"></i>


						</p>
					</div>
				</Card.Footer>
			</Card>

		</div>

	)
}

export default CardComponent