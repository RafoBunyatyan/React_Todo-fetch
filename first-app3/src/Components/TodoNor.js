import React, { useEffect, useState } from "react";

function ToDo() {
  const [data, setData] = useState({});
  const [todo, setTodo] = useState("");
  const [toDos, setToDos] = useState({});
  const [toCompl, setToCompl] = useState(true);

  const hendelToCompl = () => {
    setToCompl(!toCompl);
  };

  useEffect(() => {
    handleDraw();
  }, []);

  useEffect(() => {
    handleDraw();
  }, [data]);

  const hendeleSubmite = () => {
    fetch(`https://api-nodejs-todolist.herokuapp.com/task`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: todo,
      }),
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        setData(data);
        setTodo("");
        console.log(data);
      });
  };

  const handleDraw = () => {
    fetch(`https://api-nodejs-todolist.herokuapp.com/task`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        setToDos(data);
        console.log(data);
      });
  };

  const hendeleCpmpl = (e) => {
    const id = e.target.getAttribute("data-id");
    fetch(`https://api-nodejs-todolist.herokuapp.com/task/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: toCompl }),
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        setData(data);
        console.log(data);
      });
  };

  const handleDelete = (e) => {
    const id = e.target.getAttribute("data-id");
    fetch(`https://api-nodejs-todolist.herokuapp.com/task/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then(data => {
        return data.json();
      })
      .then(data => {
        setData(data);
        console.log(data);
      });
  };

  return (
    <>
      <form onSubmit={(e) => {
          e.preventDefault();
          hendeleSubmite();
        }}>
        <input type="text"
          value={todo}
          placeholder="addThask"
          onChange={(e) => {
            setTodo(e.target.value);
          }}/>
        <button>Add</button>
      </form>
    {
		toDos.data && (
						<ul>
							{
								toDos.data.map((todo, i) => (
									<li key={i}>
										<span className={todo.completed ? "span" : ""}
											data-id={todo._id}
											onClick={(e) => {
												hendeleCpmpl(e);
												hendelToCompl();
											}}>
											{ todo.description }
										</span>
										<button data-id={todo._id} onClick={handleDelete}>Delete</button>
									</li>
								))
							}
						</ul>
      				  )
	}
    </>
  );
}

export default ToDo;
