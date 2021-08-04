import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
// import { useFormFields } from "../libs/hooksLib";
import config from "../config";
import "./NewCheckList.css";
import {v4} from "uuid";


import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const item1 = {
  id: v4(),
  name: "First task"
}

const item2 = {
  id: v4(),
  name: "Second task"
}

const item3 = {
  id: v4(),
  name: "Third task"
}

export default function NewCheckList() {
  const file = useRef(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [stages, setStages] = useState({
    "tasks": {
      title:"Todo",
      items: [item1, item2]
    },
    "in-progress": {
      title: "In progress",
      items: [item3]
    },
    "done": {
      title: "Completed",
      items: []
    }
  });


  function validateForm() {
    return title.length > 0;
  }

  function handleChangeStage(e) {
    setStages(e.target.value)
    console.log(stages)
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
  }

  return (
    <div className="NewList">
      <Form onSubmit={handleSubmit}>
        <Row className="g-2">
          <Col md>
          
            <Form.Group size="lg" controlId="list-title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group size="lg" controlId="list-sections">
              <Form.Label>Check list stages</Form.Label>
              <Form.Control
                type="number"
                value={stages}
                min={1}
                max={10}
                onChange={(e) => handleChangeStage(e)}

              />
            </Form.Group>
          </Col>
        </Row>

        <DragDropContext className="drag_drop_area" onDragEnd={(e)=> console.log(e)}>
          <Row className="g-2">
            {_.map(stages, (data, key) => {
              return(
                <Col key={key} md>
                  <h4>{data.title}</h4>
                  <Droppable droppableId={key}>
                    {(provided) => {
                      return(
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="droppable-col"
                        >

                          {data.items.map((el, index)=>{
                            return (
                              <Draggable key={el.id} index={index} draggableId={el.id}>
                                {(provided)=>{
                                  return(
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    >
                                      {el.name}
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
                        </div>
                      )
                    }}
                  </Droppable>

                </Col>
              )
            })}
          </Row>
        </DragDropContext>

        
      
        
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
}