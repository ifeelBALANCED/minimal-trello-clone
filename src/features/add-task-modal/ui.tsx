import { CreateTaskMutation } from '@/app/lib/apollo';
import { AllTasksQuery } from '@/app/lib/apollo/queries/allTasks.query';
import { useMutation } from '@apollo/client';
import React, { FormEvent, useCallback, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

type AddTaskModalProps = {
  showModal: boolean;
  handleClose: () => void;
  boardCategory: string;
};

export const AddTaskModal = ({
  showModal,
  handleClose,
  boardCategory
}: AddTaskModalProps) => {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const clearFields = useCallback(() => {
    setTaskTitle('');
    setTaskDescription('');
  }, []);

  const [createTask] = useMutation(CreateTaskMutation, {
    onCompleted: () => {
      clearFields();
    }
  });

  const handleTaskCreate = useCallback(
    async (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      await createTask({
        variables: {
          title: taskTitle,
          description: taskDescription,
          status: boardCategory
        },
        update: (cache, { data: { addItem } }) => {
          const data: any = cache.readQuery({ query: AllTasksQuery });
          const updatedTasks = [...data.tasks, createTask];
          cache.writeQuery({
            query: AllTasksQuery,
            data: { tasks: updatedTasks }
          });
        }
      });
      toast.success('Task was successfully created!');
      handleClose();
    },
    [boardCategory, createTask, handleClose, taskDescription, taskTitle]
  );

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleTaskCreate}>
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
