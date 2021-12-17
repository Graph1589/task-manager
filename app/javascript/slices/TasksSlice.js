import { useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import { changeColumn } from '@asseinfo/react-kanban';
import { propEq } from 'ramda';

import { STATES } from 'presenters/TaskPresenter';
import TasksRepository from 'repositories/TasksRepository';
import TaskPresenter from 'presenters/TaskPresenter';

const initialState = {
  board: {
    columns: STATES.map((column) => ({
      id: column.key,
      title: column.value,
      cards: [],
      meta: {},
    })),
  },
  task: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadColumnSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: items,
        meta,
      });
    },
    loadColumnMoreSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: [...column.cards, ...items],
        meta,
      });
    },
  },
});

const { loadColumnSuccess, loadColumnMoreSuccess } = tasksSlice.actions;

export default tasksSlice.reducer;

export const useTasksActions = () => {
  const dispatch = useDispatch();

  const loadColumn = (state, page = 1, perPage = 10) => {
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    }).then(({ data }) => {
      dispatch(loadColumnSuccess({ ...data, columnId: state }));
    });
  };

  const loadColumnMore = (state, page = 1, perPage = 10) => {
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    }).then(({ data }) => {
      dispatch(loadColumnMoreSuccess({ ...data, columnId: state }));
    });
  };

  const loadBoard = () => STATES.map(({ key }) => loadColumn(key));

  const updateTask = (task, attributes) => TasksRepository.update(TaskPresenter.id(task), attributes);

  const destroyTask = (task) => TasksRepository.destroy(TaskPresenter.id(task));

  const createTask = (attributes) => TasksRepository.create(attributes);

  const loadTask = (id) => TasksRepository.show(id).then(({ data: { task } }) => task);

  return {
    loadBoard,
    loadColumn,
    loadColumnMore,
    updateTask,
    destroyTask,
    createTask,
    loadTask,
  };
};
