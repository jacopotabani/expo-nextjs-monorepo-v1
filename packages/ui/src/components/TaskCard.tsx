import { LinearGradient } from '@tamagui/linear-gradient'
import { CheckCircle, Circle, Camera, MessageSquare } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Button, Card, type CardProps, H6, Paragraph, Theme, XStack, YStack, Image } from 'tamagui'

export type TaskCardProps = {
  prompt?: string
  type?: 'text' | 'photo' | 'both'
  isRequired?: boolean
  isCompleted?: boolean
  response?: {
    text?: string
    photoUrl?: string
    createdAt?: string
  }
  onComplete?: () => void
} & CardProps

export const TaskCard = ({
  prompt,
  type = 'text',
  isRequired = false,
  isCompleted = false,
  response,
  onComplete,
  ...props
}: TaskCardProps) => {
  const [hover, setHover] = useState(false)

  const getTypeIcon = () => {
    switch (type) {
      case 'photo':
        return <Camera size="$0.75" />
      case 'both':
        return <MessageSquare size="$0.75" />
      default:
        return <MessageSquare size="$0.75" />
    }
  }

  return (
    <Card
      cursor="pointer"
      gap="$3"
      p="$4"
      borderRadius="$3"
      chromeless={!hover}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      opacity={isCompleted ? 0.8 : 1}
      {...props}
    >
      <Card.Header my="auto" padded gap="$3">
        <YStack gap="$3">
          <XStack ai="center" gap="$3" jc="space-between">
            <XStack ai="center" gap="$2" f={1}>
              <Theme name={isCompleted ? 'green_alt2' : 'blue_alt2'}>{getTypeIcon()}</Theme>
              <Paragraph size="$2" theme="alt2">
                {type === 'photo' ? 'Photo Task' : type === 'both' ? 'Text + Photo' : 'Text Task'}
                {isRequired && ' (Required)'}
              </Paragraph>
            </XStack>

            <Theme name={isCompleted ? 'green' : 'gray'}>
              {isCompleted ? <CheckCircle size="$1" /> : <Circle size="$1" />}
            </Theme>
          </XStack>

          <Paragraph size="$3">{prompt}</Paragraph>

          {response && (
            <YStack gap="$2" p="$3" bg="$color2" br="$2">
              {response.text && (
                <Paragraph size="$2" theme="alt1">
                  "{response.text}"
                </Paragraph>
              )}

              {response.photoUrl && (
                <Image
                  source={{ uri: response.photoUrl }}
                  w="100%"
                  h={120}
                  br="$2"
                  resizeMode="cover"
                />
              )}

              {response.createdAt && (
                <Paragraph size="$1" theme="alt2" ta="right">
                  {new Date(response.createdAt).toLocaleDateString()}
                </Paragraph>
              )}
            </YStack>
          )}

          {!isCompleted && (
            <Button
              size="$2"
              als="flex-end"
              onPress={onComplete}
              theme={isRequired ? 'orange' : 'blue'}
            >
              {isRequired ? 'Complete Required Task' : 'Complete Task'}
            </Button>
          )}
        </YStack>
      </Card.Header>

      <Card.Background>
        <LinearGradient
          br="$3"
          w="100%"
          h="100%"
          colors={isCompleted ? ['$green2', '$green1'] : ['$color2', '$color1']}
          start={[1, 1]}
          end={[0.85, 0]}
        />
      </Card.Background>
    </Card>
  )
}
