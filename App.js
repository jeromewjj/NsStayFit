import React from 'react';
import * as eva from '@eva-design/eva';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { AppNavigator } from './frontend/AppNavigator';


export default () => (
    <ApplicationProvider {...eva} theme={eva.light}>
        <TailwindProvider utilities={utilities}>
          <AppNavigator />
        </TailwindProvider>
    </ApplicationProvider>
);