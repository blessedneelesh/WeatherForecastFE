import { Body1, Title2 } from '@fluentui/react-components';

export function WelcomeMessage() {
  return (
    <div style={{ padding: 16 }}>
      <Title2>Welcome</Title2>
      <Body1 block>Pick a destination from the navigation to get started.</Body1>
    </div>
  );
}
