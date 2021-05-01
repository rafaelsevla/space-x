import React, { PropsWithChildren } from 'react'
import t from 'prop-types'
import { Container, CssBaseline, LinearProgress } from '@material-ui/core'
import Sidebar from './sidebar'
import { useStyles } from './styles'
import { AsyncData } from 'common/async-data'

interface Props {
  title: string;
  data: AsyncData<any>
}

const Base = ({ children, title, data }: PropsWithChildren<Props>) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar title={title} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          {data.status === 'loading' && <LinearProgress />}
          {data.status === 'error' && <h1>Um erro aconteceu ao carregar, tente novamente.</h1>}
          {data.status === 'loaded' && (
            <>
              {children}
            </>
          )}
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
