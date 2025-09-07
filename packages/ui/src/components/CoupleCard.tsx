import { LinearGradient } from '@tamagui/linear-gradient'
import { Heart, Users, Clock } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useLink } from 'solito/link'
import { Avatar, Button, Card, type CardProps, H6, Paragraph, Theme, XStack, YStack } from 'tamagui'

export type CoupleCardProps = {
  coupleName?: string
  memberCount?: number
  joinedDate?: string
  members?: Array<{
    id: string
    user_name?: string
    user_avatar_url?: string | null
  }>
  action?: {
    props?: ReturnType<typeof useLink>
    href?: string
    text: string
  }
} & CardProps

export const CoupleCard = ({
  coupleName,
  memberCount = 1,
  joinedDate,
  members,
  action,
  ...props
}: CoupleCardProps) => {
  const [hover, setHover] = useState(false)
  const detailCoupleLink = useLink({
    href: action?.href || action?.props?.href || '',
  })

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
          <XStack ai="center" gap="$3">
            <Theme name="pink_alt2">
              <Heart size="$1" />
            </Theme>
            <H6 size="$5" tt="capitalize" f={1}>
              {coupleName || 'Name not found'}
            </H6>
          </XStack>

          <XStack ai="center" gap="$2">
            <Users size="$0.75" color="$color10" />
            <Paragraph size="$3" theme="alt1">
              {memberCount} member{memberCount !== 1 ? 's' : ''}
            </Paragraph>
          </XStack>

          {/* Member Avatars Preview */}
          {members && members.length > 0 && (
            <XStack ai="center" gap="$2">
              <XStack gap="$-1">
                {members.slice(0, 3).map((member, index) => (
                  <Avatar
                    key={member.id}
                    size="$2"
                    circular
                    borderWidth={2}
                    borderColor="$background"
                  >
                    <Avatar.Image src={member.user_avatar_url || undefined} />
                    <Avatar.Fallback bg={index === 0 ? '$blue4' : '$pink4'}>
                      <Paragraph size="$1" color={index === 0 ? '$blue11' : '$pink11'}>
                        {member.user_name?.charAt(0)?.toUpperCase() || 'U'}
                      </Paragraph>
                    </Avatar.Fallback>
                  </Avatar>
                ))}
                {members.length > 3 && (
                  <Avatar size="$2" circular borderWidth={2} borderColor="$background" bg="$color5">
                    <Avatar.Fallback>
                      <Paragraph size="$1" color="$color11">
                        +{members.length - 3}
                      </Paragraph>
                    </Avatar.Fallback>
                  </Avatar>
                )}
              </XStack>
            </XStack>
          )}

          {joinedDate && (
            <XStack ai="center" gap="$2">
              <Clock size="$0.75" color="$color10" />
              <Paragraph size="$2" theme="alt2">
                Joined {new Date(joinedDate).toLocaleDateString()}
              </Paragraph>
            </XStack>
          )}

          {action && (
            <Button size="$2" als="flex-end" {...detailCoupleLink}>
              {action.text}
            </Button>
            // <Button size="$2" als="flex-end" {...(action.props || { href: action.href })}>
            //   {action.text}
            // </Button>
          )}
          {/* {action && <Link href={action.href as string}>{action.text}</Link>} */}
        </YStack>
      </Card.Header>

      <Card.Background>
        <LinearGradient
          br="$3"
          w="100%"
          h="100%"
          colors={['$pink2', '$pink1']}
          start={[1, 1]}
          end={[0.85, 0]}
        />
      </Card.Background>
    </Card>
  )
}
