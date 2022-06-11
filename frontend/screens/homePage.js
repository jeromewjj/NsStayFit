import React from 'react';
import {useTailwind} from 'tailwind-rn';
import { Layout, Text } from '@ui-kitten/components';

export default HomePage = () => {

    const tailwind = useTailwind();

    return <Text style={tailwind('text-blue-600')}>Home Page</Text>;
  }