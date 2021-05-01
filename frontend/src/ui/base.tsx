import React, { PropsWithChildren } from 'react'
import t from 'prop-types'
import { Container, CssBaseline } from '@material-ui/core'
import Sidebar from './sidebar'
import { useStyles } from './styles'

interface Props {
  title: string;
}

const Base = ({ children, title }: PropsWithChildren<Props>) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar title={title} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <>
            {children}
          </>
        </Container>
      </main>
    </div>
  )
}

Base.propTypes = {
  children: t.node.isRequired,
  title: t.string
}

export default Base
