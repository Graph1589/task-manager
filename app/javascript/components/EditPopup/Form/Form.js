import React from 'react';
import PropTypes from 'prop-types';
import { has, isNil } from 'ramda';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import UserSelect from 'components/UserSelect';
import TaskPresenter from 'presenters/TaskPresenter';
import ImageUpload from 'components/ImageUpload';

import useStyles from './useStyles';

const Form = ({ errors, onChange, onRemoveImage, onAttachImage, task }) => {
  const handleChangeTextField = (fieldName) => (event) => onChange({ ...task, [fieldName]: event.target.value });
  const handleChangeSelect = (fieldName) => (user) => onChange({ ...task, [fieldName]: user });

  const styles = useStyles();

  return (
    <form className={styles.root}>
      {isNil(TaskPresenter.imageUrl(task)) ? (
        <div>
          <ImageUpload onUpload={onAttachImage} />
        </div>
      ) : (
        <div>
          <img className={styles.preview} src={TaskPresenter.imageUrl(task)} alt="Attachment" />
          <Button variant="contained" size="small" color="primary" onClick={onRemoveImage}>
            Remove image
          </Button>
        </div>
      )}
      <TextField
        error={has('name', errors)}
        helperText={errors.name}
        onChange={handleChangeTextField('name')}
        value={TaskPresenter.name(task)}
        label="Name"
        required
        margin="dense"
      />
      <TextField
        error={has('description', errors)}
        helperText={errors.description}
        onChange={handleChangeTextField('description')}
        value={TaskPresenter.description(task)}
        label="Description"
        required
        multiline
        margin="dense"
      />
      <UserSelect
        label="Author"
        value={TaskPresenter.author(task)}
        onChange={handleChangeSelect('author')}
        isRequired
        error={has('author', errors)}
        helperText={errors.author}
      />
      <UserSelect
        label="Assignee"
        value={TaskPresenter.assignee(task)}
        onChange={handleChangeSelect('assignee')}
        isRequired
        isDisabled={false}
        isClearable
        error={has('assignee', errors)}
        helperText={errors.assignee}
      />
    </form>
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onAttachImage: PropTypes.func.isRequired,
  onRemoveImage: PropTypes.func.isRequired,
  task: TaskPresenter.shape().isRequired,
  errors: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.arrayOf(PropTypes.string),
    assignee: PropTypes.arrayOf(PropTypes.string),
  }),
};

Form.defaultProps = {
  errors: {},
};

export default Form;
