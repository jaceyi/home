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
      loading: false,
      activeEditFile: {}
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
              onClick={() => this.handleClickEditFileBtn(file)}>编辑</Button>
            <Button
              type={'danger'}
              onClick={() => this.handleClickDeleteFileBtn(file.id)}>删除</Button>
          </div>
        )
      }
    ];

    return (
      <div className={'FileManagement'}>
        <Modal
          visible={uploadModalVisible}
          onOk={() => this.handleSubmitUploadFile()}
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
          <Button type={'primary'} size={'large'} onClick={() => this.handleClickUploadFileBtn()}>上传文件</Button>
        </Row>
        <Table
          rowKey={'id'}
          className={'FileManagement_list'}
          dataSource={staticFileList}
          columns={columns}/>
      </div>
    )
  }

  handleClickUploadFileBtn() {
    this.props.form.resetFields();
    this.setState({
      fileList: [],
      uploadModalVisible: true,
      activeEditFile: {}
    });
  }

  handleHideUploadModal() {
    this.setState({
      uploadModalVisible: false
    });
  }

  handleSubmitUploadFile() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {fileList} = this.state;
        if (fileList.length) {
          this.uploadStaticFile({
            ...values,
            file: fileList[fileList.length - 1]
          });
        } else {
          this.props.form.setFields({
            file: {
              value: null,
              errors: [new Error('请选择文件！')]
            }
          })
        }
      }
    });
  }

  uploadStaticFile({file, title, description}) {
    const {
      activeEditFile
    } = this.state;
    if (activeEditFile.id) {
      // 编辑状态
      const formData = new FormData();
      formData.append('id', activeEditFile.id);
      formData.append('title', title);
      if (description) {
        formData.append('description', description);
      }
      if (file.uid === '-1') {
        // -1 则无变更
        formData.append('file', JSON.stringify(activeEditFile));
      } else {
        formData.append('file', file.originFileObj);
      }
      rq.post('updateStaticFile', formData)
        .then(
          res => {
            message.success(res.data.msg);
            const {staticFileList} = this.state;
            staticFileList.splice(staticFileList.findIndex(item => item.id === activeEditFile.id), 1, res.data.data);
            this.setState({
              uploadModalVisible: false,
              staticFileList: [...staticFileList]
            })
          }
        )
    } else {
      const formData = new FormData();
      formData.append('file', file.originFileObj);
      formData.append('title', title);
      if (description) {
        formData.append('description', description);
      }
      rq.post('addStaticFile', formData)
        .then(
          res => {
            message.success(res.data.msg);
            this.setState({
              staticFileList: [res.data.data, ...this.state.staticFileList]
            })
          }
        )
    }
  }

  handleChangeFileList({fileList}) {
    const {length} = fileList;
    this.setState({
      fileList: length ? [fileList[length - 1]] : []
    });
  }

  handleClickEditFileBtn(file) {
    const {
      title,
      description,
      path,
      name
    } = file;

    this.setState({
      activeEditFile: file
    });
    this.props.form.setFieldsValue({
      title,
      description,
      file: {}
    });
    this.setState({
      uploadModalVisible: true,
      fileList: [{
        uid: '-1',
        url: path,
        name
      }]
    })
  }

  handleClickDeleteFileBtn(id) {
    rq.post('/deleteStaticFile', {id})
      .then(
        res => {
          message.success(res.data.msg);
          const {staticFileList} = this.state;
          staticFileList.splice(staticFileList.findIndex(item => item.id === id), 1);
          this.setState({
            uploadModalVisible: false,
            staticFileList: [...staticFileList]
          })
        }
      )
  }
}

const WrappedNormalFileManagement = Form.create()(FileManagement);
export default WrappedNormalFileManagement;
