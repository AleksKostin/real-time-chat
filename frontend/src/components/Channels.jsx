import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { actions as channelsActions} from '../slices/channelsSlice.js';

const Channels = () => {
  const dispatch = useDispatch();

  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const handleClick = (id) => {
    dispatch(channelsActions.setCurrentCnannelId(id));
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            {channel.removable ? (
              <div role="group" className="d-flex dropdown btn-group">
                <button type="button" className="w-100 rounded-0 text-start text-truncate btn">
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
                <button type="button" id="react-aria486610400-2" aria-expanded="false" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn">
                  <span className="visually-hidden">Управление каналом</span>
                </button>
              </div>
            )
              : (
                <button
                  type="button"
                  onClick={() => handleClick(channel.id)}
                  className={cn('w-100', 'rounded-0', 'text-start', 'btn', {
                    'btn-secondary': channel.id === currentChannelId,
                  })}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Channels;
