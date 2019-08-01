import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import Icon from "antd/lib/icon";
import {populateSearchResults} from "../actions";
import {connect} from "react-redux";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SearchForm extends Component {

  findSongs = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Meteor.call("searchTracks", (values.search), (err, response) => {
          if (err) {
            console.log(err.toString());
          } else {
            this.props.populateSearchResults(response);
            console.log(this.props.searchResults);
          }
        })
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const titleError = isFieldTouched('title') && getFieldError('title');
    return (
      <Form layout="inline" onSubmit={this.findSongs}>
        <Form.Item validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('search', {
            rules: [{ required: true, message: 'Please input the title!' }],
          })(
            <Input
              prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Search"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Search
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.searchResults.songs,
    hasLoaded: state.searchResults.hasLoaded,
    checkedTags: state.tagsPanel.checkedTags
  };
};

const WrappedSearchForm = connect(mapStateToProps, {populateSearchResults})(Form.create({ name: 'horizontal_login' })(SearchForm));

export default WrappedSearchForm;