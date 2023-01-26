import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import {
  actions as channelsActions,
} from '../../../slices/channelsSlice.js';
import { actions as modalsActions } from '../../../slices/modalsSlice.js';
import { getAllChannels, getCurrentChannelId } from '../../../selectors.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector(getAllChannels);
  const currentChannelId = useSelector(getCurrentChannelId);

  const handleChooseChannel = (id) => {
    dispatch(channelsActions.setCurrentCnannelId(id));
  };

  const handleAddChannel = () => {
    dispatch(modalsActions.setTypeModal({ nameModal: 'add' }));
  };

  const handleRemoveChannel = (id) => {
    dispatch(modalsActions.setTypeModal({ nameModal: 'remove', channelId: id }));
  };

  const handleRenameChannel = (id) => {
    dispatch(modalsActions.setTypeModal({ nameModal: 'rename', channelId: id }));
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.header')}</span>
        <Button
          type="button"
          onClick={() => handleAddChannel()}
          variant="group-vertical"
          className="p-0 text-primary border-0"
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            {channel.removable
              ? (
                <Dropdown as={ButtonGroup} className="d-flex">
                  <Button
                    type="button"
                    className="w-100 rounded-0 text-start text-truncate border-0"
                    onClick={() => handleChooseChannel(channel.id)}
                    variant={channel.id === currentChannelId && 'secondary'}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </Button>
                  <Dropdown.Toggle
                    split
                    className="flex-grow-0 border-0"
                    variant={channel.id === currentChannelId && 'secondary'}
                  >
                    <span className="visually-hidden">{t('channels.control')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleRemoveChannel(channel.id)}>{t('channels.remove')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRenameChannel(channel.id)}>{t('channels.rename')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )
              : (
                <button
                  type="button"
                  onClick={() => handleChooseChannel(channel.id)}
                  className={cn('w-100', 'rounded-0', 'text-start', 'btn', 'border-0', {
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
};

export default Channels;
