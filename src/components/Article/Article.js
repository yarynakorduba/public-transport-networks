import React from "react"
import Trigger from "../Trigger"
import londonBusNetwork from "../../images/london_bus_network_1.png"
import bristolBusNetwork from "../../images/bristol_bus_network.png"
import lvivBusNetwork from "../../images/lviv_bus_network.png"
import trafficJam from "../../images/traffic_jam.png"

import "./Article.scss"
import { getBristolLSpaceGraph } from "../../api"
const Article = () => (
  <div className={"Article"}>
    {console.log(getBristolLSpaceGraph())}
    <header className={"Article__chapter"}>Introduction</header>
    <h1 className={"Article__header"}>Problem&nbsp;Description & Historical&nbsp;Precedent</h1>
    <p className={"Article__paragraph Article__paragraph--first"}>
      Public transport networks resilience and efficiency are the important aspects of every big city`s functioning. In
      a stable and well-structured network not only the average travel time and quantity of route changes are small, but
      also the safety of the passengers under different circumstances is increased.
    </p>
    <p className={"Article__paragraph"}>
      An unstable network can suffer unexpectedly under random failures as well as targeted attacks. Random failures
      include accidents, large traffic jams or even poor weather conditions at some parts of the network that cause
      inaccessibility of some stops or even the whole routes. Much worse are targeted attacks, for example, terrorist
      acts. Such attacks often occur at the highly connected stops, so called hubs, which are the most important for the
      whole network and where a lot of passengers gather.
    </p>
    <img className={"Article__image"} src={trafficJam} alt={"Traffic Jam"} />
    <h1 className={"Article__header"}>Urban-base solutions</h1>
    <p className={"Article__paragraph Article__paragraph--first"}>
      Prohibiting turns for traffic across the bus lane significantly reduces delays to the buses. Bus priority will
      often be provided at signalized intersections to reduce delays by extending the green phase or reducing the red
      phase in the required direction compared to the normal sequence. Prohibiting turns may be the most important
      measure for moving buses through intersections.
    </p>
    <h1 className={"Article__header"}>Scientific approaches</h1>
    <p className={"Article__paragraph Article__paragraph--first"}>
      A lot of different scientific approaches for the exploration of the public transport system appeared. Having a set
      of the stops and their connections we can build a graph in different dimensions. E.g., we can display the stops as
      the nodes and put edge between two stops only if they are adjacent on the route. and analyse the routes using
      common estimations. This type of representation is called L-space. We can also display the stops of every route as
      complete subgraphs of the network, as technically we can reach any stop of a route from any another stop of this
      route. The subgraphs in such representation are connected if Mean degree of the nodes can give us
    </p>
    <h1 className={"Article__header"}>Related Works</h1>
    <p className={"Article__paragraph Article__paragraph--first"}>
      Prohibiting turns for traffic across the bus lane significantly reduces delays to the buses. Bus priority will
      often be provided at signalized intersections to reduce delays by extending the green phase or reducing the red
      phase in the required direction compared to the normal sequence. Prohibiting turns may be the most important
      measure for moving buses through intersections.
    </p>
    <header className={"Article__chapter"}>London and Bristol</header>
    <h1 className={"Article__header"}>Repeated&nbsp;Explorations in&nbsp;L-space</h1>
    <p className={"Article__paragraph Article__paragraph--first"}>
      In this article we will concentrate on the three PTNs of different sizes. The first and the biggest one is In our
      work, we first repeated the analysis of <Trigger data={{ name: "London" }}>London bus network</Trigger> in
      L-space.
      <img className={"Article__image"} alt="London Bus Network" src={londonBusNetwork} />
    </p>
    <p className={"Article__paragraph"}>
      The second transport system is the bus network of Bristol.
      <img className={"Article__image"} alt="Bristol Bus Network" src={bristolBusNetwork} />
    </p>
    <p className={"Article__paragraph"}>
      Last but not least, we will explore Lviv public transport system.
      <img className={"Article__image"} alt="Lviv Bus Network" src={lvivBusNetwork} />
    </p>
    <p className={"Article__paragraph"}>
      Transport networks can be represented in different spaces. L-space is a representation where all the stops are the
      nodes and two stops are connected if they are adjacent in a route. A{" "}
      <Trigger data={{ name: "Bristol" }}>Bristol bus network</Trigger> in
      <Trigger data={{ space: "L" }}>L-space</Trigger> representation is shown on the right side of the page. This type
      of representation is the most understandable for people as it displays routes and their connections as they look
      in the real world.
    </p>
    <p className={"Article__paragraph"}>
      Another useful type of representation displays each route as a complete subgraph with the stops represented by the
      nodes. Two routes are connected if they share at least one stop. Such perspective is called{" "}
      <Trigger data={{ space: "P" }}>P-space</Trigger>. On the right side you can see the representation of Bristol bus
      network in P-space.
    </p>
    <p className={"Article__paragraph"}>
      To explore the network from different perspective, one can represent the routes by the nodes of the graph and show
      connections between them by the edges. Such perspective is called <Trigger data={{ space: "C" }}>C-space</Trigger>
      . Below is the representation of Bristol bus network in C-space.
    </p>
    <p className={"Article__paragraph"}>
      Explorations of <Trigger data={{ name: "London" }}>London public transport network</Trigger> were also made in
      three different spaces. Few years ago the scientists generated <Trigger data={{ space: "L" }}>L-space</Trigger>{" "}
      representation and extracted some features, such as mean node degree, mean shortest path length and the overall
      network resilience. Later, the representation in <Trigger>C-space</Trigger> was generated to analyse the network
      from the routes perspective.
    </p>
    <p className={"Article__paragraph"}>
      What's the use of buses? Buses may be used for scheduled bus transport, scheduled coach transport, school
      transport, private hire, or tourism; promotional buses may be used for political campaigns and others are
      privately operated for a wide range of purposes, including rock and pop band tour vehicles. Horse-drawn buses were
      used from the 1820s, followed by steam buses in the 1830s, and electric trolleybuses in 1882. The first internal
      combustion engine buses, or motor buses, were used in 1895.[3] Recently, interest has been growing in hybrid
      electric buses, fuel cell buses, and electric buses, as well as ones powered by compressed natural gas or
      biodiesel. As of the 2010s, bus manufacturing is increasingly globalised, with the same designs appearing around
      the world.
    </p>
    <p className={"Article__paragraph"}>
      Now let's look at busways busway or transitway, is a bus-based public transport system designed to improve
      capacity and reliability relative to a conventional bus system.[2] Typically, a BRT system includes roadways that
      are dedicated to buses, and gives priority to buses at intersections where buses may interact with other traffic;
      alongside design features to reduce delays caused by passengers boarding or leaving buses, or purchasing fares.
      BRT aims to combine the capacity and speed of a metro with the flexibility, lower cost and simplicity of a bus
      system.
    </p>
    <p className={"Article__paragraph"}>
      Lets look at the shortest route of Bristol public transport network, which describes a high-capacity urban
      public-transit system with its own right of way, multiple-car vehicles at short headways, and longer stop spacing
      than traditional streetcars and buses. BRT uses buses on a wide variety of rights-of-way, including mixed traffic,
      dedicated lanes on surface streets, and busways separated from traffic. The expression "BRT" is mainly used in the
      Americas and China; in India, it is called "BRTS" (BRT System); in Europe and Indonesia, it is often called a
      "busway"; while in the British Isles, it may be called a "quality bus".
    </p>
    <p className={"Article__paragraph"}>
      <Trigger data={{ name: "Lviv" }}>Critics</Trigger> have charged that the term "bus rapid transit" has sometimes
      been misapplied to systems that lack most or all the essential features which differentiate it from conventional
      bus services. The term "bus rapid transit creep" has been used to describe severely degraded levels of bus service
      which fall far short of the BRT Standard promoted by the Institute for Transportation and Development Policy and
      other organizations.
    </p>
    <h1 className={"Article__header"}>New&nbsp;Explorations: P-space and&nbsp;C-space</h1>
    <p className={"Article__paragraph"}>
      Lets look at the longest route ofBristol public transport network, It was converted from trolley to bus use in
      1948. However, the first BRT system in the world was the OC Transpo system in Ottawa, Canada. Introduced in 1973,
      the first element of its BRT system was dedicated bus lanes through the city centre, with platformed stops. The
      introduction of the first exclusive separate busways (termed 'Transitway') occurred in 1983. By 1996, all of the
      originally envisioned 31 km Transitway system was in operation; further expansions were opened in 2009, 2011, and
      2014. As of 2017, the central part of the Transitway is being converted to a Light Rail Transit, due to the
      downtown section being operated beyond its designed capacity.[4]
    </p>
    <header className={"Article__chapter"}>Lviv</header>
    <h1 className={"Article__header"}>Lviv Public&nbsp;Transport&nbsp;Dataset</h1>
    <p className={"Article__paragraph Article__paragraph--first"}>
      In the United States, BRT began in 1977, with Pittsburgh's South Busway,[10] operating on 4.3 miles (6.9 km) of
      exclusive lanes. Its success led to the Martin Luther King Jr. East Busway in 1983, a fuller BRT deployment
      including a dedicated busway of 9.1 miles (14.6 km), traffic signal preemption, and peak service headway as low as
      two minutes. After the opening of the West Busway, 5.1 miles (8.2 km) in length in 1990, Pittsburgh’s Busway
      system is today over 18.5 miles long.
    </p>
    <p className={"Article__paragraph"}>
      Bus-only lanes make for faster travel and ensure that buses are not delayed by mixed traffic congestion. A median
      alignment bus-only keeps buses away from busy curb-side side conflicts, where cars and trucks are parking,
      standing and turning. Separate rights of way may be used such as the completely elevated Xiamen BRT. Transit malls
      or 'bus streets' may also be created in city centers.
    </p>
    <h1 className={"Article__header"}>L-, P- and C-spaces: three views on Lviv`s Public Transport Network</h1>
    <p className={"Article__paragraph"}>...</p>
    <header>Conclusions</header>
    <p className={"Article__paragraph"}>...</p>
    <h1 className={"Article__header"}>Another visualizations</h1>
    <p className={"Article__paragraph"}>
      <iframe
        title={"Uber Distribution"}
        src={"http://1fykyq3mdn5r21tpna3wkdyi-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/blog_arcs.gif"}
      />
      <iframe title="Netherlands Trains" src={"http://tulpinteractive.com/on-time-every-time/"} />
      <iframe
        title={"New York Bikes"}
        src={
          "http://toddwschneider.com/posts/a-tale-of-twenty-two-million-citi-bikes-analyzing-the-nyc-bike-share-system/"
        }
      />
    </p>
  </div>
)

export default Article
