import { CardTask } from '@/entities';
import { AddTaskModal } from '@/features';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button, Col, Container } from 'react-bootstrap';

type BoardSectionProps = {
  title: string;
  tasks: Task[];
};

export const BoardSection = ({ title, tasks }: BoardSectionProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Col md={3} className="d-flex flex-column p-2">
        <div className="board-section-header d-flex flex-row align-items-center">
          <h3 className="me-auto">{title}</h3>
          <FontAwesomeIcon icon={faPlus} onClick={handleShow} />
        </div>
        <Droppable droppableId={title}>
          {(provided) => (
            <Container
              className="p-0 d-flex flex-column h-100"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks?.map((task: Task, index: number) => (
                <CardTask
                  key={index}
                  index={index}
                  {...task}
                  boardCategory={title}
                />
              ))}
              {tasks.length > 0 && (
                <Button className="add-wrapper" onClick={handleShow}>
                  <FontAwesomeIcon icon={faPlus} className="p-2" />
                  Add Task
                </Button>
              )}
              {tasks.length === 0 && (
                <div className="is-empty d-flex flex-column">
                  <Button className="add-wrapper" onClick={handleShow}>
                    <FontAwesomeIcon icon={faPlus} className="p-2" />
                    Add Task
                  </Button>
                </div>
              )}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </Col>
      <AddTaskModal
        showModal={showModal}
        handleClose={handleClose}
        boardCategory={title}
      />
    </>
  );
};
