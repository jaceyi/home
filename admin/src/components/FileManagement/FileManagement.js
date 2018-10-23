import React from 'react';
import {Button, Modal, Form, Input, Upload, message, Table} from 'antd';
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
    const columns = [
      {
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '描述',
        dataIndex: 'description',
        render: text => text || '-'
      },
      {
        title: '文件',
        dataIndex: 'file',
        render: file => (<a href={file.path} target={'brank'}>{file.name}</a>)
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: id => (<Button type={'danger'} onClick={() => this.handleDeleteFile(id)}>删除</Button>)
      }
    ];

    return (
      <div className={'FileManagement'}>
        <Modal
          visible={uploadModalVisible}
          onOk={() => this.handleClickUploadBtn()}
          onCancel={() => this.handleHideUploadModal()}
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
                getFieldDecorator('description')(<Input.TextArea placeholder={'请输入文件备注'}/>)
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
        <Button type={'primary'} onClick={() => this.handleShowUploadModal()}>上传文件</Button>
        <Table
          rowKey={'id'}
          className={'FileManagement_list'}
          title={() => <h3>文件列表</h3>}
          dataSource={[
            {
              id: 1,
              title: '文件1',
              description: '',
              file: {
                path: '//yijic.com/public/images/bg_main.jpg',
                name: '背景图'
              }
            }
          ]}
          columns={columns}/>
      </div>
    )
  }

  handleShowUploadModal() {
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
        if (values.description) {
          formData.append('description', values.description);
        }

        rq.post('uploadStaticFile', formData)
          .then(
            res => {
              message.success(res.data.msg);
              this.handleHideUploadModal();
            }
          )
      }
    });
  }

  handleHideUploadModal() {
    this.setState({
      uploadModalVisible: false
    })
  }

  handleDeleteFile(id) {
    console.log(id)
  }
}

const WrappedNormalFileManagement = Form.create()(FileManagement);
export default WrappedNormalFileManagement;
