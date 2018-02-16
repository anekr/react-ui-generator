import * as React from 'react';
import { ChangeEvent } from 'react';
import {
  GeneratedForm,
  Fields,
  FieldRenderer,
  FieldMetaDescription,
  FieldProps,
    KeyValue
  } from '@react-ui-generator/core';

  import { withDefaults, extractFieldActions } from '@react-ui-generator/core';

  export interface ItemData {
    value: object;
    isDirty: boolean;
  }

  export interface ListFormProps extends FieldProps {
    formData: {
      value: ItemData[];
      isDirty: boolean;
    };

    serializer?: string;
    renderers: { [key: string]: typeof FieldRenderer };
    validator(valdiate: any, schema: any): void;
  }

  export class ListForm extends React.PureComponent<ListFormProps, {}> {
    handleOnChange(idx: number, itemData: any) {
      const newValue = [...this.props.formData.value];

      newValue[idx] = itemData;
      this.props.onChange(newValue);
    }

    render() {
      const {
        id,
        className,
        onChange,
        disabled,
        config,
        formData,
        errors,
        renderers,
        validator,
        serializer,
        actions
      } = this.props;

      const enhancedFieldsMeta = config.fields.map((meta: FieldMetaDescription) => {
        const renderer =
          typeof meta.renderer === 'object'
            ? meta.renderer
            : { type: meta.renderer, config: {} };

        renderer.config.disabled = disabled;
        meta.serializer = `${serializer || id}.${meta.serializer || meta.id}`;

        return meta;
      });

      return formData.value.map((itemData: ItemData, idx: number) => {
        const wrappedActions = Object
          .keys(actions)
          .reduce((acc: KeyValue, key: string) => {
            acc[key] = (...args: any[]) => actions[key](idx, ...args);
            return acc;
          }, {});

      return (
        <GeneratedForm
          key={`list-form-${id}-${idx}`}
          className={className || ''}
          meta={{ fields: enhancedFieldsMeta }}
          data={itemData}
          errors={errors}
          validator={validator}
          renderers={renderers}
          actions={wrappedActions}
          onChange={data => this.handleOnChange(idx, data)}
        >
          {this.props.children}
        </GeneratedForm>
      );
    });
  }
}
