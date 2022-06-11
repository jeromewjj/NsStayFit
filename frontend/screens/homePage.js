import React from 'react';
import {useTailwind} from 'tailwind-rn';
import { Layout, Text } from '@ui-kitten/components';

export default HomePage = () => {

    const tailwind = useTailwind();

    return(
        <Layout style={tailwind('flex-col')}>
            <Layout level='1'>
                <Text>4</Text>
            </Layout>
            <Layout level='3'>
                <Text>3</Text>
            </Layout>
            <Layout level='2'>
                <Text>2</Text>
            </Layout>
            <Layout level='4'>
                <Text>1</Text>
            </Layout>
        </Layout>
    )
  }
