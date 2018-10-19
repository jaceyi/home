import React from 'react';
import {Button, Modal, Form, Input, Upload, message} from 'antd';
import rq from '../../utils/request';

class FileManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadModalVisible: false
    }
  }

  render() {
    const {
      uploadModalVisible
    } = this.state;
    const {getFieldDecorator} = this.props.form;

    return (
      <div>
        <Button type={'primary'} onClick={() => this.handleClickShowUploadModalBtn()}>上传文件</Button>
        <Modal
          visible={uploadModalVisible}
          onOk={() => this.handleClickUploadBtn()}
        >
          <Form>
            <Form.Item label={'标题'}>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入标题！' }]
              })(
                <Input placeholder={'请输入文件标题'}/>
              )}
            </Form.Item>
            <Form.Item label={'备注'}>
              {
                getFieldDecorator('remark')(<Input.TextArea placeholder={'请输入文件备注'}/>)
              }
            </Form.Item>
            <Form.Item label={'文件'}>
              {getFieldDecorator('file', {
                rules: [{ required: true, message: '请选择文件！' }]
              })(
                <Upload beforeUpload={() => false} listType={'picture'} length={1}>
                  <Button type={'primary'}>上传</Button>
                </Upload>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }

  handleClickShowUploadModalBtn() {
    this.setState({
      uploadModalVisible: true
    })
  }

  handleClickUploadBtn() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const formData = new FormData();
        formData.append('file', values.file.file);
        formData.append('title', values.title);
        formData.append('remark', values.remark);

        rq.post('uploadStaticFile', formData)
          .then(
            res => {
              message.success(res.data.msg);
            }
          )
      }
    });
  }
}

const WrappedNormalFileManagement = Form.create()(FileManagement);
export default WrappedNormalFileManagement;
