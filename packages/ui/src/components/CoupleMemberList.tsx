import { Crown, MoreHorizontal, UserMinus, Calendar } from '@tamagui/lucide-icons'
import { useState } from 'react'
import {
  Avatar,
  Button,
  Card,
  type CardProps,
  H6,
  Paragraph,
  XStack,
  YStack,
  Popover,
  Separator,
} from 'tamagui'

export type CoupleMember = {
  id: string
  user_id: string
  role: string
  status: string
  joined_at: string
  left_at?: string | null
  user_name?: string
  user_avatar_url?: string | null
}

export type CoupleMemberListProps = {
  members: CoupleMember[]
  currentUserRole?: string
  currentUserId?: string
  isLoading?: boolean
  onRemoveMember?: (memberId: string) => void
} & CardProps

export const CoupleMemberList = ({
  members,
  currentUserRole,
  currentUserId,
  isLoading = false,
  onRemoveMember,
  ...props
}: CoupleMemberListProps) => {
  const [openPopover, setOpenPopover] = useState<string | null>(null)

  if (isLoading) {
    return (
      <YStack gap="$3" {...props}>
        {[...Array(2)].map((_, i) => (
          <Card key={i} p="$4">
            <XStack ai="center" gap="$4">
              <Avatar size="$4" circular bg="$color5" />
              <YStack f={1} gap="$2">
                <Card height="$1" bg="$color5" />
                <Card height="$0.75" bg="$color5" width="60%" />
              </YStack>
            </XStack>
          </Card>
        ))}
      </YStack>
    )
  }

  if (!members || members.length === 0) {
    return (
      <Card p="$6" ai="center" jc="center" {...props}>
        <YStack ai="center" gap="$3">
          <Avatar size="$4" circular bg="$color5">
            <Avatar.Fallback>
              <Paragraph color="$color10">?</Paragraph>
            </Avatar.Fallback>
          </Avatar>
          <Paragraph theme="alt1">No members found</Paragraph>
        </YStack>
      </Card>
    )
  }

  // Sort members: creators first, then by join date
  const sortedMembers = [...members].sort((a, b) => {
    if (a.role === 'creator' && b.role !== 'creator') return -1
    if (b.role === 'creator' && a.role !== 'creator') return 1
    return new Date(a.joined_at).getTime() - new Date(b.joined_at).getTime()
  })

  return (
    <YStack gap="$3" {...props}>
      {sortedMembers.map((member) => (
        <Card key={member.id} p="$4" borderRadius="$4" hoverStyle={{ bg: '$color3' }}>
          <XStack ai="center" jc="space-between">
            <XStack ai="center" gap="$4" f={1}>
              <Avatar size="$4" circular>
                <Avatar.Image src={member.user_avatar_url || undefined} />
                <Avatar.Fallback bg={member.role === 'creator' ? '$blue4' : '$pink4'}>
                  <Paragraph color={member.role === 'creator' ? '$blue11' : '$pink11'}>
                    {member.user_name?.charAt(0)?.toUpperCase() || 'U'}
                  </Paragraph>
                </Avatar.Fallback>
              </Avatar>

              <YStack f={1} gap="$1">
                <XStack ai="center" gap="$2">
                  <H6 size="$4">
                    {member.user_name || 'Unknown User'}
                    {member.user_id === currentUserId ? ' (You)' : ''}
                  </H6>
                  {member.role === 'creator' && <Crown size="$0.75" color="$yellow10" />}
                </XStack>

                <XStack ai="center" gap="$3">
                  <Card
                    size="$1"
                    bg={member.role === 'creator' ? '$blue4' : '$color5'}
                    px="$2"
                    py="$1"
                  >
                    <Paragraph
                      size="$1"
                      color={member.role === 'creator' ? '$blue11' : '$color11'}
                      tt="capitalize"
                    >
                      {member.role}
                    </Paragraph>
                  </Card>

                  <Card
                    size="$1"
                    bg={
                      member.status === 'active'
                        ? '$green4'
                        : member.status === 'pending'
                        ? '$orange4'
                        : '$color5'
                    }
                    px="$2"
                    py="$1"
                  >
                    <Paragraph
                      size="$1"
                      color={
                        member.status === 'active'
                          ? '$green11'
                          : member.status === 'pending'
                          ? '$orange11'
                          : '$color11'
                      }
                      tt="capitalize"
                    >
                      {member.status}
                    </Paragraph>
                  </Card>

                  <XStack ai="center" gap="$1">
                    <Calendar size="$0.5" color="$color10" />
                    <Paragraph size="$2" theme="alt2">
                      Joined {new Date(member.joined_at).toLocaleDateString()}
                    </Paragraph>
                  </XStack>
                </XStack>
              </YStack>
            </XStack>

            {/* Actions for creators to manage other members */}
            {currentUserRole === 'creator' && member.role !== 'creator' && onRemoveMember && (
              <Popover
                open={openPopover === member.id}
                onOpenChange={(open) => setOpenPopover(open ? member.id : null)}
              >
                <Popover.Trigger asChild>
                  <Button size="$2" chromeless icon={MoreHorizontal} />
                </Popover.Trigger>

                <Popover.Content p="$2" gap="$1">
                  <Button
                    size="$2"
                    chromeless
                    color="$red10"
                    icon={UserMinus}
                    onPress={() => {
                      onRemoveMember(member.id)
                      setOpenPopover(null)
                    }}
                  >
                    Remove Member
                  </Button>
                </Popover.Content>
              </Popover>
            )}
          </XStack>
        </Card>
      ))}
    </YStack>
  )
}
