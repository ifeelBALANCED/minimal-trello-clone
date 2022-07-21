import { UpdateOnDragMutation } from '@/app/lib/apollo';
import { AllTasksQuery } from '@/app/lib/apollo/queries/allTasks.query';
import { Error } from '@/app/shared';
import { BoardSection } from '@/entities/board-section/ui';
import { useMutation, useQuery } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Row, Spinner } from 'react-bootstrap';

const Board = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data, loading, error } = useQuery(AllTasksQuery, {
    onCompleted: (data) => setTasks(data)
  });
  const [updateTask] = useMutation(UpdateOnDragMutation);
  const sections = ['Backlog', 'In-Progress', 'Review', 'Done'] as const;

  const onDragEnd = useCallback(
    async (result: any) => {
      const { destination, source, draggableId } = result;

      if (!destination || destination.droppableId === source.droppableId)
        return;

      await updateTask({
        variables: {
          id: draggableId,
          status: destination.droppableId
        }
      });

      const updatedTasksList = (tasks as any)?.tasks?.map((task: any) =>
        task.id === draggableId
          ? { ...task, status: destination.droppableId }
          : task
      );
      setTasks(updatedTasksList);
    },
    [tasks, updateTask]
  );

  if (loading) {
    return (
      <div className="loader-centered">
        <Spinner animation="border" variant="secondary" />
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="pt-3 h100 d-flex flex-column">
      <Row className="mx-0">
        <h1>Project title</h1>
      </Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-container d-flex flex-row flex-grow-1">
          {sections.map((section: string, index: number) => {
            const filteredData: Task[] = data
              ? data.tasks.filter((task: Task) => task.status === section)
              : [];
            return (
              <BoardSection key={index} title={section} tasks={filteredData} />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
