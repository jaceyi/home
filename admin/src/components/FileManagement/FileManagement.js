import React from 'react';
import {Button, Modal, Form, Input, Upload, message, Table, Row} from 'antd';
import rq from '../../utils/request';

class FileManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadModalVisible: false,
      fileList: [],
      staticFileList: [],
      editStatus: false,
      loading: false
    }
  }

  componentWillMount() {
    this.componentInit();
  }

  componentInit() {
    rq.get('getStaticFileList')
      .then(
        res => {
          this.setState({
            staticFileList: res.data.data
          })
        }
      )
  }

  render() {
    const {
      uploadModalVisible,
      fileList,
      staticFileList
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
        render: file => (<a href={file.path} target={'_brank'}>{file.name}</a>)
      },
      {
        title: '文件大小',
        dataIndex: 'size',
        render: size => `${parseInt(size / 1024)}Kb`
      },
      {
        title: '操作',
        render: file => (
          <div>
            <Button
              style={{marginRight: 10}}
              onClick={() => this.handleEditFile(file)}>编辑</Button>
            <Button
              type={'danger'}
              onClick={() => this.handleDeleteFile(file)}>删除</Button>
          </div>
        )
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
                rules: [{required: true, message: '请输入标题！'}]
              })(
                <Input placeholder={'请输入文件标题'}/>
              )}
            </Form.Item>
            <Form.Item label={'描述'}>
              {
                getFieldDecorator('description')(<Input.TextArea placeholder={'请输入文件描述'}/>)
              }
            </Form.Item>
            <Form.Item label={'文件'}>
              {getFieldDecorator('file', {
                rules: [{required: true, message: '请选择文件！'}]
              })(
                <Upload
                  beforeUpload={() => false}
                  listType={'picture'}
                  fileList={fileList}
                  onChange={v => this.handleChangeFileList(v)}>
                  <Button type={'primary'}>上传</Button>
                </Upload>
              )}
            </Form.Item>
          </Form>
        </Modal>
        <Row type={'flex'} align={'middle'} justify={'space-between'}>
          <h3 style={{margin: 0}}>文件列表</h3>
          <Button type={'primary'} size={'large'} onClick={() => this.handleShowUploadModal()}>上传文件</Button>
        </Row>
        <Table
          rowKey={'id'}
          className={'FileManagement_list'}
          dataSource={staticFileList}
          columns={columns}/>
      </div>
    )
  }

  handleShowUploadModal() {
    this.props.form.resetFields();
    this.setState({
      fileList: [],
      uploadModalVisible: true,
      editStatus: false
    });
  }

  handleClickUploadBtn() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.uploadStaticFile(values);
      }
    });
  }

  uploadStaticFile({file, title, description}) {
    const {
      editStatus
    } = this.state;
    if (editStatus) {
      if (file.id) {
        // 有id表示file没有被重新上传

      }
    } else {
      const formData = new FormData();
      formData.append('file', file.file);
      formData.append('title', title);
      if (description) {
        formData.append('description', description);
      }

      rq.post('uploadStaticFile', formData)
        .then(
          res => {
            message.success(res.data.msg);
            this.setState({
              uploadModalVisible: false
            });
            this.setState({
              staticFileList: [res.data.data, ...this.state.staticFileList]
            })
          }
        )
    }
  }

  handleHideUploadModal() {
    this.setState({
      uploadModalVisible: false
    })
  }

  handleChangeFileList({fileList}) {
    const {length} = fileList;
    this.setState({
      fileList: length ? [fileList[length - 1]] : []
    })
  }

  handleEditFile({id, title, description, name, path}) {
    this.props.form.setFieldsValue({
      title,
      description,
      file: {
        id
      }
    });
    this.setState({
      uploadModalVisible: true,
      fileList: [{
        uid: '-1',
        url: path,
        name
      }],
      editStatus: true
    })
  }

  handleDeleteFile(file) {
    console.log(file)
  }
}

const WrappedNormalFileManagement = Form.create()(FileManagement);
export default WrappedNormalFileManagement;
