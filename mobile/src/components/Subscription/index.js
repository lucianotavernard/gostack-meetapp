import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Cover,
  Info,
  Title,
  InfoItem,
  Text,
  InfoButton,
} from './styles';

export default function Subscription({ data, onCancel }) {
  const [loading, setLoading] = useState(false);

  async function handlePress() {
    setLoading(true);

    await onCancel();

    setLoading(false);
  }

  return (
    <Container past={data.past}>
      <Cover source={{ uri: data.avatar.url }} />
      <Info>
        <Title>{data.title}</Title>

        <InfoItem>
          <Icon name="event" size={20} color="#999" />
          <Text>{data.dateFormatted}</Text>
        </InfoItem>

        <InfoItem>
          <Icon name="room" size={20} color="#999" />
          <Text>{data.location}</Text>
        </InfoItem>

        <InfoItem>
          <Icon name="person" size={20} color="#999" />
          <Text>Organizador: {data.User.name}</Text>
        </InfoItem>

        {!data.past && (
          <InfoButton onPress={handlePress} loading={loading}>
            Cancelar inscrição
          </InfoButton>
        )}
      </Info>
    </Container>
  );
}

Subscription.propTypes = {
  data: PropTypes.shape({
    avatar: PropTypes.shape({ url: PropTypes.string }),
    User: PropTypes.shape({ name: PropTypes.string }),
    title: PropTypes.string,
    dateFormatted: PropTypes.string,
    location: PropTypes.string,
    past: PropTypes.bool,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};
