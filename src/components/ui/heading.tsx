type Props = {
  title: string
  description: string
}

export const Heading = ({ description, title }: Props) => {
  return (
    <header>
      <h2 className='scroll-m-20 text-3xl font-bold tracking-tight'>{title}</h2>
      <p className='text-sm font-medium text-muted-foreground'>{description}</p>
    </header>
  )
}
