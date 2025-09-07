import { LinearGradient } from '@tamagui/linear-gradient'
import { Target, Clock, Star } from '@tamagui/lucide-icons'
import { useState } from 'react'
import type { useLink } from 'solito/link'
import {
  Button,
  Card,
  type CardProps,
  H6,
  Paragraph,
  Theme,
  type ThemeName,
  XStack,
  YStack,
  Progress,
} from 'tamagui'

export type ChallengeCardProps = {
  title?: string
  description?: string
  category?: string
  estimatedTime?: number
  intensity?: number
  status?: 'not_started' | 'in_progress' | 'completed'
  startedAt?: string
  progress?: {
    completed: number
    total: number
  }
  action?: {
    props?: ReturnType<typeof useLink>
    href?: string
    text: string
  }
} & CardProps

export const ChallengeCard = ({
  title,
  description,
  category,
  estimatedTime,
  intensity = 1,
  status = 'not_started',
  startedAt,
  progress,
  action,
  ...props
}: ChallengeCardProps) => {
  const [hover, setHover] = useState(false)

  const getStatusColor = (): ThemeName => {
    switch (status) {
      case 'completed':
        return 'green'
      case 'in_progress':
        return 'blue'
      default:
        return 'gray'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'in_progress':
        return 'In Progress'
      default:
        return 'Not Started'
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
      {...props}
    >
      <Card.Header my="auto" padded gap="$3">
        <YStack gap="$3">
          <XStack ai="center" jc="space-between">
            <XStack ai="center" gap="$3">
              <Theme name="blue_alt2">
                <Target size="$1" />
              </Theme>
              <H6 size="$5" tt="capitalize" f={1}>
                {title || 'Challenge'}
              </H6>
            </XStack>
            <Theme name={getStatusColor()}>
              <Paragraph size="$2" fow="600">
                {getStatusText()}
              </Paragraph>
            </Theme>
          </XStack>

          {description && (
            <Paragraph size="$3" theme="alt1" numberOfLines={2}>
              {description}
            </Paragraph>
          )}

          <XStack ai="center" gap="$4">
            {category && (
              <XStack ai="center" gap="$2">
                <Theme name="purple">
                  <Paragraph size="$2" fow="500">
                    {category}
                  </Paragraph>
                </Theme>
              </XStack>
            )}

            {estimatedTime && (
              <XStack ai="center" gap="$2">
                <Clock size="$0.75" color="$color10" />
                <Paragraph size="$2" theme="alt2">
                  {estimatedTime}m
                </Paragraph>
              </XStack>
            )}

            {intensity && (
              <XStack ai="center" gap="$1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size="$0.5"
                    color={i < intensity ? '$yellow10' : '$gray6'}
                    fill={i < intensity ? '$yellow10' : 'transparent'}
                  />
                ))}
              </XStack>
            )}
          </XStack>

          {progress && (
            <YStack gap="$2">
              <XStack ai="center" jc="space-between">
                <Paragraph size="$2" theme="alt1">
                  Progress
                </Paragraph>
                <Paragraph size="$2" theme="alt1">
                  {progress.completed}/{progress.total}
                </Paragraph>
              </XStack>
              <Progress
                value={(progress.completed / progress.total) * 100}
                backgroundColor="$gray4"
              >
                <Progress.Indicator animation="bouncy" backgroundColor="$blue10" />
              </Progress>
            </YStack>
          )}

          {action && (
            <Button size="$2" als="flex-end" {...(action.props || { href: action.href })}>
              {action.text}
            </Button>
          )}
        </YStack>
      </Card.Header>

      <Card.Background>
        <LinearGradient
          br="$3"
          w="100%"
          h="100%"
          colors={['$blue2', '$blue1']}
          start={[1, 1]}
          end={[0.85, 0]}
        />
      </Card.Background>
    </Card>
  )
}
