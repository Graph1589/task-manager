import PropTypes from 'prop-types';
import PropTypesPresenter from 'utils/PropTypesPresenter';

export default new PropTypesPresenter({
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  state: PropTypes.string,
  expired_at: PropTypes.string,
  transitions: PropTypes.array,
  author: PropTypes.object,
  assignee: PropTypes.object,
});
