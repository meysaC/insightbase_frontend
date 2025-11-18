import {
  CopyIcon,
  RefreshCcwIcon,
  ShareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"
// import { Example } from "@/components/ui/ai-actions";
import { Conversation, ConversationContent } from '@/components/ui/conversation';
import { Message, MessageContent } from '@/components/ui/message';
import { Action, Actions } from '@/components/ui/actions';

const Chat = () => {
  const messages = [
  {
    id: "1",
    from: "user",
    content: "Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?",
    avatar: "https://github.com/evilrabbit.png",
    name: "Ali Imam",
  },
  {
    id: "2",
    from: "assistant",
    content: "I am fine, thank you!I am fine, thank you!I am fine, thank you!I am fine, thank you!I am fine, thank you!I am fine, thank you!I am fine, thank you! iplease provide more details about your project. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
  {
    id: "3",
    from: "assistant",
    content: "I am fine, thank you!",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
  {
    id: "4",
    from: "assistant",
    content: "I am fine, thank you!",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
  {
    id: "5",
    from: "assistant",
    content: "I am fine, thank you!",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
  {
    id: "6",
    from: "assistant",
    content: "I am fine, thank you!",
    avatar: "https://github.com/openai.png",
    name: "OpenAI",
  },
    {
    id: "7",
    from: "user",
    content: "Hello, how are you?",
    avatar: "https://github.com/evilrabbit.png",
    name: "Ali Imam",
  },
    {
    id: "8",
    from: "user",
    content: "Hello, how are you?",
    avatar: "https://github.com/evilrabbit.png",
    name: "Ali Imam",
  },
    {
    id: "9",
    from: "user",
    content: "Hello, how are you?",
    avatar: "https://github.com/evilrabbit.png",
    name: "Ali Imam",
  },
    {
    id: "10",
    from: "user",
    content: "Hello, how are you?",
    avatar: "https://github.com/evilrabbit.png",
    name: "Ali Imam",
  },
]
  const actions = [
    {
      icon: RefreshCcwIcon,
      label: "Retry",
    },
    {
      icon: ThumbsUpIcon,
      label: "Like",
    },
    {
      icon: ThumbsDownIcon,
      label: "Dislike",
    },
    {
      icon: CopyIcon,
      label: "Copy",
    },
    {
      icon: ShareIcon,
      label: "Share",
    },
  ]

  return (
    
        <Conversation >
          <ConversationContent>
            
            {messages.map((message) => (
              
              <Message key={message.id} from={message.from} className={`flex flex-col gap-2 ${message.from === "assistant" ? "items-start" : "items-end"}`}>

                <MessageContent>{message.content}</MessageContent>
                
                {message.from === "assistant" && (
                  <Actions className="mt-2">
                    {actions.map((action) => (
                      <Action key={action.label} label={action.label}>
                        <action.icon className="size-4" />
                      </Action>
                    ))}
                  </Actions>
                )}

              </Message>

            ))}

          </ConversationContent>
        </Conversation>
  )
}

export default Chat


    // <div className='flex justify-center items-center'>h-[600px] 
