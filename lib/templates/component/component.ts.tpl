import {ComponentClass} from '../../utils/midi'

type Data = {
  mockData: string,
}

class #{name}Component extends ComponentClass<Data> {
  properties = {
    mockProperty: {
      type: String,
      value: '',
      observer: (newVal: string, oldVal: string) => {
        console.log({newVal, oldVal})
      },
    },
  }

  data: Data = {
    mockData: '',
  }
}

Component(new #{name}Component())
