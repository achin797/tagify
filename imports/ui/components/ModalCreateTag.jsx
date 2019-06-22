import React from 'react';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import Input from 'antd/lib/input';
import {
  createTag,
  closeModalCreateTag,
  modalCreateTagOnChangeDisplayName as onChangeDisplayName
} from '../actions';

const ModalCreateTag = ({
  isOpen,
  displayName,
  createTag,
  closeModalCreateTag,
  onChangeDisplayName
}) => (
  <Modal
    title="Create a tag"
    visible={isOpen}
    onOk={() => {
      createTag(displayName);
      closeModalCreateTag();
    }}
    onCancel={() => closeModalCreateTag()}
  >
    <Input
      value={displayName}
      onChange={e => onChangeDisplayName(e.target.value)}
      placeholder="e.g. bus ride"
    />
  </Modal>
);

const mapStateToProps = state => {
  return {
    isOpen: state.modalCreateTag.isOpen,
    displayName: state.modalCreateTag.displayName
  };
};

export default connect(mapStateToProps, {
  createTag,
  closeModalCreateTag,
  onChangeDisplayName
})(ModalCreateTag);
