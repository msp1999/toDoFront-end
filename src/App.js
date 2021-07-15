import './App.css';
import { Container } from 'react-bootstrap';
import TodoCards from './components/TodoCards/TodoCards';
import { ToastContainer } from "react-toastify";
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import TodoItemsList from './components/TodoItemsList/TodoItemsList';

function App() {

  return (
    <Container>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route exact path="/todos" component={TodoCards} />
          <Route exact path="/todos/:todoId" component={TodoItemsList} />
          <Redirect to="/todos" />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
