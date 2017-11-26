import * as React from 'react';
import { connect } from "react-redux";
import * as Immutable from 'immutable'
import classNames from 'classnames';
import invariant from 'invariant';

import { schema, SchemaMap } from '../schema'

import Rating from "./Rating";
import FormInput from "./FormInput"

import * as styles from "../../css/app.sass"

interface EditState {
  row: number,
  key: string
}

interface DialogState {
  idx: number,
  type: string
}

interface State {
  edit?: EditState,
  dialog?: DialogState,
}

class Excel extends React.Component<any, any> {

  private schema: SchemaMap[];
  private input: any;
  public state: State;
  constructor(props?, context?) {
    super(props, context);
    this.schema = schema;
    this.state = {
      edit: null, // {row index, schema.id}
      dialog: null, // {type, idx}
    };
  }

  _sort(key: string) {
    const descending = this.props.sortby === key && !this.props.descending;
    this.props.updateSort(key, descending);
    //CRUDActions.sort(key, descending);
  }

  _showEditor(e) {
    const target = e.target as HTMLElement;
    this.setState({
      edit: {
        row: parseInt(target.dataset.row, 10),
        key: target.dataset.key
      }
    });
  }

  _save(e: React.FormEvent<HTMLFormElement>, primary_key: number) {
    e.preventDefault();
    invariant(this.state.edit, 'Messed up edit state');
    let value = this.input.value ? this.input.value:this.input.getValue()
    console.log(value)
    this.props.updateData(primary_key, this.state.edit.key, value)
    /* CRUDActions.updateField(
      this.state.edit.row,
      this.state.edit.key,
      this.refs.input.getValue()
    ); */
    this.setState({
      edit: null
    });
  }

  _actionClick(rowidx: number, action: string) {
    /* this.setState({
      dialog: {
        type: action,
        idx: rowidx,
      },
    }); */
  }
  _getClassNames(id: string) {
    let labelClasses = {
      'year': styles.schemaYear,
      'grape': styles.schemaGrape,
      'name': styles.schemaName,
      'comments': 'schema-rating',
      'rating': 'schema-name'
    }
    return labelClasses[id];
  }
  _renderTable() {
    return (
      <table>
        <thead>
          <tr>
            {
              this.schema.map(item => {
                if (!item.show) {
                  return null;
                }
                let title = item.label;
                if (this.props.sortby === item.id) {
                  title += this.props.descending ? '\u2191' : ' \u2193';
                }
                return (
                  <th
                    className={this._getClassNames(item.id)}
                    key={item.id}
                    onClick={e => this._sort(item.id)}
                  >
                    {title}
                  </th>
                )
              }, this)
            }
            <th className={styles.excelNotSortable}>Actions</th>
          </tr>
        </thead>
        <tbody onDoubleClick={e => this._showEditor(e)}>
          {
            this.props.data.map((row, rowidx) => {
              return (
                <tr key={rowidx}>
                  {
                    Object.keys(row).map((cell, idx) => {
                      const schema = this.schema[idx];
                      if (!schema || !schema.show) {
                        return null;
                      }
                      const isRating = schema.type === 'rating';
                      const edit = this.state.edit;
                      let content = row[cell];
                      if (!isRating && edit && edit.row === rowidx && edit.key === schema.id) {
                        console.log(content)
                        content = (
                          <form onSubmit={e => this._save(e, row.primary_key)}>
                            <FormInput {...schema} refName={ref => this.input = ref} primary_key={row.primary_key} defaultValue={content} />
                          </form>
                        );
                      } else if (isRating) {
                        content = <Rating defaultValue={Number(content)} readonly={true} />;
                      }
                      return (
                        <td
                          className={classNames({
                            [`${this._getClassNames(schema.id)}`]: true,
                            [`${styles.ExcelEditable}`]: !isRating,
                            [`${styles.ExcelDataLeft}`]: schema.align === 'left',
                            [`${styles.ExcelDataRight}`]: schema.align === 'right',
                            [`${styles.ExcelDataCenter}`]: schema.align !== 'left' && schema.align !== 'right',
                          })}
                          key={idx}
                          data-row={rowidx}
                          data-key={schema.id}
                        >
                          {content}
                        </td>
                      );
                    }, this)
                  }
                  {/* <td className="ExcelDataCenter">
                    <Actions onAction={this._actionClick.bind(this, rowidx)}/>
                  </td> */}
                </tr>
              );
            }, this)
          }
        </tbody>
      </table>
    );
  }
  /*
  _deleteConfirmationClick(action: string) {
    this.setState({ dialog: null });
    if (action === 'dismiss') {
      return;
    }
    const index = this.state.dialog ?
' this.state.dialog.idx : null;
    invariant(typeof index === 'number', 'Unexpected dialog state');
    CRUDActions.delete(index);
  }

  _renderDeleteDialog() {
    const index = this.state.dialog && this.state.dialog.idx;
    invariant(typeof index === 'number', 'Unexpected dialog state');
    const first = this.state.data.get(index);
    const nameguess = first[Object.keys(first)[0]];
    return (
      <Dialog
        header="Confirm deletion"
        confirmLabel="Delete"
        modal={true}
        onAction={this._deleteConfirmationClick.bind(this)}>
        {`Are you sure you want to delete "${nameguess}"?`}
      </Dialog>
    );
  }

  _saveDataDialog(action: string) {
    this.setState({ dialog: null });
    if (action === 'dismiss') {
      return;
    }
    const index = this.state.dialog ? this.state.dialog.idx : null;
    invariant(typeof index === 'number', 'Unexpected dialog state');
    CRUDActions.updateRecord(index, this.refs.form.getData());
  }

  _renderFormDialog(readonly: ?boolean) {
    const index = this.state.dialog ? this.state.dialog.idx : null;
    invariant(typeof index === 'number', 'Unexpected dialog state');
    return (
      <Dialog
        modal={true}
        header={readonly ? 'Item info' : 'Edit item'}
        confirmLabel={readonly ? 'ok' : 'Save'}
        hasCancel={!readonly}
        onAction={this._saveDataDialog.bind(this)}
      >
        <Form
          ref="form"
          recordId={index}
          readonly={!!readonly}
        />
      </Dialog>
    );
  }

  _renderDialog() {
    if (!this.state.dialog) {
      return null;
    }
    switch (this.state.dialog.type) {
      case 'delete':
        return this._renderDeleteDialog();
      case 'info':
        return this._renderFormDialog(true);
      case 'edit':
        return this._renderFormDialog();
      default:
        throw Error(`Unexpected dialog type ${this.state.dialog.type}`);
    }
  }
  */
  render() {
    return (
      <div className={styles.Excel}>
        {this._renderTable()}
        {/*this._renderDialog()*/}
      </div>
    )
  }

}

export default connect(
  (state) => (
    { 
      data: state.wine_data,
      sortby: state.sortby,
      descending: state.descending,
    }
  ),
  (dispatch) => ({
    updateSort: (key, descending) => dispatch({ type: 'UPDATE_SORT', sortby: key, descending}),
    updateData: (key, id, value) => dispatch({ type: 'UPDATE_DATA', key, id, value}),
  })
)(Excel);
