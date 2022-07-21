import { DeleteTaskMutation, UpdateTaskMutation } from '@/app/lib/apollo';
import { useMutation } from '@apollo/client';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useCallback, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

export const CardTask = (task: Task) => {
  const { title, description, id, boardCategory, index } = task;
  const [updateTask] = useMutation(UpdateTaskMutation);
  const [deleteTask] = useMutation(DeleteTaskMutation);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>(title);
  const [taskDescription, setTaskDescription] = useState<string>(description);
  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleTaskUpdate = useCallback(
    async (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      const variables = {
        title: taskTitle,
        description: taskDescription,
        id,
        status: boardCategory
      };
      await updateTask({ variables });
      toast.success('Task was successfully updated!');
      handleClose();
    },
    [boardCategory, id, taskDescription, taskTitle, updateTask]
  );

  const handleTaskDelete = useCallback(async () => {
    const variables = { id };
    await deleteTask({
      variables,
      update: (cache) => {
        cache.modify({
          fields: {
            tasks(existingTaskRefs, { readField }) {
              return existingTaskRefs.filter(
                (taskRef: any) => id !== readField('id', taskRef)
              );
            }
          }
        });
      }
    });
    toast.success('Task was successfully deleted!');
    handleClose();
  }, [deleteTask, id]);

  return (
    <>
      <Draggable draggableId={id} index={index as number}>
        {(provided) => (
          <Card
            className="task-container"
            onClick={() => handleShow()}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Card.Body>{title}</Card.Body>
          </Card>
        )}
      </Draggable>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTaskUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Update
              </Button>
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ padding: '2px', cursor: 'pointer' }}
                size="lg"
                onClick={handleTaskDelete}
              />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
