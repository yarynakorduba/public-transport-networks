import React from "react"
import Trigger from "../Trigger"
import bristolLSpace from "../../images/bristolLSpace.png"
import bristolCSpace from "../../images/bristolCSpace.png"
import bristolPSpace from "../../images/bristolPSpace.png"
import londonCSpace from "../../images/londonCSpace.png"
import londonBusNetwork from "../../images/london_bus_network_1.png"
import bristolBusNetwork from "../../images/bristol_bus_network.png"
import lvivBusNetwork from "../../images/lviv_bus_network.png"

import "./Article.scss"
const Article = () => (
  <div className={"Article"}>
    <header className={"Article__header"}>London Public Transport Network</header>
    <p className={"Article__paragraph Article__paragraph--first"}>
        London<Trigger data={{ name: "London" }}>London</Trigger> public transport network. It is really important. Just imagine
      you need to get to Big Ben. What would you use? Of course public transport. So let's figure out what does it mean
      to be a bus. A bus (archaically also omnibus,[1] multibus, motorbus, autobus) is a road vehicle designed to carry
      many passengers. Buses can have a capacity as high as 300 passengers.[2] The most common type of bus is the
      single-deck rigid bus, with larger loads carried by double-decker and articulated buses, and smaller loads carried
      by midibuses and minibuses; coaches are used for longer-distance services. Many types of buses, such as city
      transit buses and inter-city coaches, charge a fare. Other types, such as elementary or secondary school buses or
      shuttle buses within a post-secondary education campus do not charge a fare. In many jurisdictions, bus drivers
      require a special licence above and beyond a regular driver's licence.
    </p>
    <p className={"Article__paragraph"}>
      <Trigger data={{ time: "Whats" }}>What's</Trigger>What's the use of buses? Buses may be used for scheduled bus
      transport, scheduled coach transport, school transport, private hire, or tourism; promotional buses may be used
      for political campaigns and others are privately operated for a wide range of purposes, including rock and pop
      band tour vehicles. Horse-drawn buses were used from the 1820s, followed by steam buses in the 1830s, and electric
      trolleybuses in 1882. The first internal combustion engine buses, or motor buses, were used in 1895.[3] Recently,
      interest has been growing in hybrid electric buses, fuel cell buses, and electric buses, as well as ones powered
      by compressed natural gas or biodiesel. As of the 2010s, bus manufacturing is increasingly globalised, with the
      same designs appearing around the world.
    </p>
    <p className={"Article__paragraph"}>
      Now let's look at busways busway or transitway, is a bus-based public transport system designed to improve
      capacity and reliability relative to a conventional bus system.[2] Typically, a BRT system includes roadways that
      are dedicated to buses, and gives priority to buses at intersections where buses may interact with other traffic;
      alongside design features to reduce delays caused by passengers boarding or leaving buses, or purchasing fares.
      BRT aims to combine the capacity and speed of a metro with the flexibility, lower cost and simplicity of a bus
      system.
    </p>
    <p>
      Lets look at{" "}
      <span id="1" className="anchor" style={{ color: "red" }}>
        the shortest route of Bristol public transport network,
      </span>{" "}
      which describes a high-capacity urban public-transit system with its own right of way, multiple-car vehicles at
      short headways, and longer stop spacing than traditional streetcars and buses. BRT uses buses on a wide variety of
      rights-of-way, including mixed traffic, dedicated lanes on surface streets, and busways separated from traffic.
      The expression "BRT" is mainly used in the Americas and China; in India, it is called "BRTS" (BRT System); in
      Europe and Indonesia, it is often called a "busway"; while in the British Isles, it may be called a "quality bus".
    </p>
    <p>
      <Trigger data={{ name: "Lviv" }}>Critics</Trigger> have charged that the term "bus rapid transit" has sometimes
      been misapplied to systems that lack most or all the essential features which differentiate it from conventional
      bus services. The term "bus rapid transit creep" has been used to describe severely degraded levels of bus service
      which fall far short of the BRT Standard promoted by the Institute for Transportation and Development Policy and
      other organizations.
    </p>
    <p>
      Lets look at the longest route ofBristol public transport network, It was converted from trolley to bus use in
      1948. However, the first BRT system in the world was the OC Transpo system in Ottawa, Canada. Introduced in 1973,
      the first element of its BRT system was dedicated bus lanes through the city centre, with platformed stops. The
      introduction of the first exclusive separate busways (termed 'Transitway') occurred in 1983. By 1996, all of the
      originally envisioned 31 km Transitway system was in operation; further expansions were opened in 2009, 2011, and
      2014. As of 2017, the central part of the Transitway is being converted to a Light Rail Transit, due to the
      downtown section being operated beyond its designed capacity.[4]
    </p>
    <p>
      The second BRT system in the world was the Rede Integrada de Transporte (RIT, integrated transportation network),
      implemented in Curitiba, Brazil, in 1974.[5]:5[6] Most of the elements that have become associated with BRT were
      innovations first suggested by Curitiba Mayor Architect Jaime Lerner.[7][8] Initially just dedicated bus lanes in
      the center of major arterial roads, in 1980 the Curitiba system added a feeder bus network and inter-zone
      connections, and in 1992 introduced off-board fare collection, enclosed stations, and platform-level boarding.
    </p>
    <p>
      In the United States, BRT began in 1977, with Pittsburgh's South Busway,[10] operating on 4.3 miles (6.9 km) of
      exclusive lanes. Its success led to the Martin Luther King Jr. East Busway in 1983, a fuller BRT deployment
      including a dedicated busway of 9.1 miles (14.6 km), traffic signal preemption, and peak service headway as low as
      two minutes. After the opening of the West Busway, 5.1 miles (8.2 km) in length in 1990, Pittsburgh’s Busway
      system is today over 18.5 miles long.
    </p>
    <p>
      Bus-only lanes make for faster travel and ensure that buses are not delayed by mixed traffic congestion. A median
      alignment bus-only keeps buses away from busy curb-side side conflicts, where cars and trucks are parking,
      standing and turning. Separate rights of way may be used such as the completely elevated Xiamen BRT. Transit malls
      or 'bus streets' may also be created in city centers.
    </p>
    <p>
      Prohibiting turns for traffic across the bus lane significantly reduces delays to the buses. Bus priority will
      often be provided at signalized intersections to reduce delays by extending the green phase or reducing the red
      phase in the required direction compared to the normal sequence. Prohibiting turns may be the most important
      measure for moving buses through intersections.
    </p>
    <p>
      Public transport networks are complex systems that have many features to explore. In this article we will
      concentrate on the three PTNs of different sizes. The first and the biggest one is London bus network.
      <img className={"Article__image"} alt="London Bus Network" src={londonBusNetwork} />
    </p>
    <p>
      The second transport system is the bus network of Bristol.
      <img className={"Article__image"} alt="Bristol Bus Network" src={bristolBusNetwork} />
    </p>
    <p>
      Last but not least, we will explore Lviv public transport system.
      <img className={"Article__image"} alt="Lviv Bus Network" src={lvivBusNetwork} />
    </p>
    <p>
      Transport networks can be represented in different spaces. L-space is a representation where all the stops are the
      nodes and two stops are connected if they are adjacent in a route. Here is an L-space representation of Bristol
      bus network:
      <img className={"Article__image"} src={bristolLSpace} alt={"Bristol Bus Network L-space"} />
    </p>
    <p>
      Another type of representation is P-space. In P-space each route is a complete subgraph with the stops represented
      by the nodes. Two routes are connected if they share at least one stop. Below you can see the representation of
      Bristol bus network in P-space.
      <img className={"Article__image"} src={bristolPSpace} alt={"Bristol Bus Network P-space"} />
    </p>
    <p>
      To explore the network from different perspective, one can represent the routes by the nodes of the graph and show
      connections between them by the edges. Such type of representation is called C-space. Below is the representation
      of Bristol bus network in C-space.
      <img className={"Article__image"} src={bristolCSpace} alt={"Bristol Bus Network C-space"} />
      And the representation of London network in C-space.
      <img className={"Article__image"} src={londonCSpace} alt={"London Bus Network C-space"} />
    </p>
  </div>
)

export default Article
