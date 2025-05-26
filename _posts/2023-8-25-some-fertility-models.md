---
layout: post
title: Notes on Models with Endogenous Fertility
published: true
date: 2023-8-25
categories: [Modeling]
tags: [fertility]
---
Summary from [THE ECONOMICS OF FERTILITY: A NEW ERA](https://www.nber.org/system/files/working_papers/w29948/w29948.pdf)

## Quantity-Quality Tradeoff

An adult utility function

$$
    \max_{c,n,e} u(c,n,h) = \log (c) + \delta \log(n h)
$$

subject to constraint

$$
\begin{align} 
    c + p e n &= (1-\phi n) w, \\
    h &= (e + \theta)^\gamma
\end{align}
$$

where $c,e,n,p,w,\phi, \delta$ are consumption, education, fertility, price of education, wage, time-cost of child-rearing, utility derived from children, while $h, \theta, \gamma$ are human capital, default education without parents' investment, and returns to human capital.

FOC

$$
c =  \frac{w}{1+\delta}
$$

and

$$
\begin{align}
e^\ast = 
			\begin{cases}
				\dfrac{\gamma\phi w/p - \theta}{1-\gamma} > 0 	&\text{ if } w > \dfrac{\theta p}{\gamma\phi}, \\
				0 												&\text{ if } w \leq \dfrac{\theta p}{\gamma\phi}
			\end{cases}
		\end{align}
$$

$$
		\begin{align}
			n^\ast = 
   \begin{cases}
   \dfrac{\delta}{1+\delta} \dfrac{1-\gamma}{\phi w-\gamma p\theta}
			 &\text{ if } w > \dfrac{\theta p}{\gamma\phi}, \\
				\dfrac{\delta}{1+\delta}\dfrac{1}{\phi}	 &\text{ if } w \leq \dfrac{\theta p}{\gamma\phi}
			\end{cases}
		\end{align}
$$

Literature: 
- Becker & Lewis (1973), Barro & Becker (1989), Becker & Murphy & Tamura (1990), Galor & Weil (2000), Galor (2005), Delventhal & Fernandez-Villaverde & Guner (2021). 
- [**Mortality**] Cervellati & Sunde (2005), Doepke (2005), Soares (2005), de la Croix and Licandro (2013). 
- [**Urbanization**] Greenwood & Seshadri (2002). 
- [**Poverty**] de la Croix & Doepke (2003), Moav (2005). 
- [**Tax**] Manuelli & Seshadri (2009). 
- [**Women's right**] Doepke and Tertilt (2009).

## Opportunity Cost of Women's Time

Assume that husband works fulltime and child-rearing is done primarily by women. The wife's time constraint is

$$
 l_f + n \phi = 1
$$

A couple's maximization problem

$$
    \max_{c,n,e} u(c,n,h) = \log(c) + \delta \log(n) + \delta\gamma\log(\theta + e)
$$

subject to

$$
    c + pen = w_m + (1-\phi n) wf
$$

FOC

$$
    n = \frac{\delta}{1+\delta} \cdot \frac{1}{\theta} \cdot \left(1 + \frac{w_m}{w_f} \right)
$$

If the wage gap $w_m/w_f$ closes, fertility declines.

Literature:
- Galor & Weil (1996), Coskun & Dalgic (2020), Moffitt (1984)

## Marketization of Childcare

Instead of providing childcare on their own, a couple can buy this on the market at price $p_s$. The share of childcare a couple can buy is $s\in[0,\bar{s}]$ where $\bar{s}$ is the maximum amount of childcare that can be outsourced. The couple's problem is

$$
    \max_{c,n,s} \log(c) + \delta \log(n)
$$

subject to

$$
    c + \psi n + s p_s n \phi = w_m + w_f[1-(1-s)n\phi]
$$

FOC: given $s$, the optimal choice is

$$
    n = \frac{\delta}{1+\delta} \frac{w_m + w_f}{\psi + [s p_s + (1-s)w_f]\phi}
$$

If the wife's wage is lower than child care cost $(w_f < p_s)$, she provides childcare by herself and $s=0$. Otherwise, the couple buys as much childcare as possible available in the market $(s=\bar{s})$. Comparative statics gives

$$
 \frac{\partial n}{\partial w_f} = \frac{\delta}{1+\delta} \frac{\psi + (sp_s - (1-s) w_m)\phi}{(\cdot)^2}
$$

Assume that $\psi < w_m\phi$ then

$$
 \frac{\partial n}{\partial w_f} 
 \begin{cases}
    < 0 \iff s < \omega, \\
    = 0 \iff s = \omega, \\
    > 0 \iff s > \omega
 \end{cases}
$$

for

$$
\omega = \frac{w_m\phi - \psi}{(p_s + w_m)\phi}
$$

Literature:
- [**U-shape rls between fertility and female wages**] Ahn and Mira (2002), Hazan and Zoabi (2015), and Bar et al. (2018). Hazan, Weiss, and Zoabi (2021a).

## Careers and Timing of Fertility

A woman lives for two periods and makes decisions on fertility and career planning. In the first period, she can invest $e$ fraction of time to invest in human capital, which rewards $h(e) = \kappa e^\gamma$ in the second period. For simplicity, a woman can have at most one child. The woman can decide to have children in learly life $n_1=1$ and none in later life $n_2=0$, or vice versa $n_1 = 0$ and $n_2 = 1$. But later life's birth introduces a risk $\pi \in (0,1)$.

The woman maximizes expected utility

$$
 \max \log(c_1) + (1-\pi n_2)\log(c_{2,0}) + \pi n_2 \log(c_{2,1}) + \nu n_2 + \pi \nu n_2
$$

subject to

$$
 \begin{align}
    c_1 = w_f (1-n_1\phi - e), \\
    c_{2,n_2} = w_f \kappa e^\gamma (1-n_2\phi)
 \end{align}
$$

Note that utility derived from children is linear in this model, which is without loss of generality given that fertility n1, n2 is either zero or one. Given $n_1, n_2$, the optimal career choice is

$$
e = \frac{\gamma}{1+\gamma} (1-n_1\phi).
$$

This result demonstrates the tradeoff between early fertility and career planning. Having children at a younger age conflicts with the career planning of the mother. There are 3 cases.

1. No children $n_1 = n_2 = 0$
   
   $$
    u_{0,0} = \log \left(\frac{w_f}{1+\gamma} \right) + \log\left(\kappa w_f\left(\frac{\gamma}{1+\gamma}\right)^\gamma\right)
   $$

2. Children early $n_1 = 1, n_2 = 0$.
   
   $$
    u_{1,0} = u_{0,0} + (1+\gamma)\log(1-\phi) + \nu
   $$

3. Children late $n_1 = 0, n_2 = 1$.
   
   $$
    u_{0,1} = u_{0,0} + \pi [\log(1-\phi) + \nu].
   $$

It is better to have children early rather than late if

$$
    \underbrace{(1-\pi)(\nu + \log(1-\phi))}_{\text{expected cost of no child when young (infecundity)}} > \underbrace{-\gamma \log (1-\phi)}_{\text{career cost of early children}}
$$

which can be boiled down to the weight $\nu$

$$
\begin{align}
    \nu > - (1+\gamma)\log(1-\phi) \ \text{ for early birth } \\
    \nu > - \log(1-\phi) \ \text{ for late birth }
\end{align}
$$

To make our model even more explicit, we could assume there are two types of jobs. One job offers a flat earnings path, i.e. $\kappa = 1$ and $\gamma = 0$, while the other job has an increasing earning path that is a function of education investments.

Literature:
- Moffitt (1984), Francesconi (2002), Keane & Wolpin (2010), Eckstein & Keane & Lifshitz (2019)
- [**Different Earnings**]  Goldin (2014), Erosa et al. (2021), Jang & Yum (2020).
  

## Social Norms

An additional determinant of childcare arrangements that varies widely across countries consists of attitudes or social norms regarding women’s and men’s roles in raising children and
providing financially for their families.

The social norm is represented as a level $s^*$ of purchased childcare that represents “what people typically do,” i.e., a reflection of society’s expectations of women’s proper role in childcare. The couple suffers a utility loss when deviating from this social norm. The couple maximizes the following utility

$$
 u(c,n,s) = c + \nu n - n \frac{\tau(s-s^*)^2}{2}
$$

subject to

$$
 c + s p_s \phi n = w_m + w_f (1-(1-s)n\phi)
$$

If the couple decides to have a child $n=1$, then the optimal choice of market-provided childcare is

$$
s = 
\begin{cases}
    0 & \iff w_f < p_s - \dfrac{\tau s^*}{\phi}, \\\\
    s^* + \dfrac{(w_f - p_s)\phi}{\tau} & \iff p_s - \dfrac{\tau s^*}{\phi} \leq w_f \leq p_s + \dfrac{\tau(1 - s^*)}{\phi}, \\\\
    1 & \iff w_f \geq p_s + \dfrac{\tau(1 - s^*)}{\phi}
\end{cases}
$$


Household's utility as a function of fertility decision

$$
u(n) = 
\begin{cases}
    w_m + w_f - w_f n \phi + n\nu - n I_{low} (w_f) &\iff w_f < p_s, \\
    w_m + w_f - p_s n \phi + n\nu - n I_{high} (w_f) &\iff w_f > p_s
\end{cases}
$$

where $I_{low}$ and $I_{high}$ denote the utility cost induced by the social norm on low-wage and high-wage couples, specifically

$$
 I_{low} = 
 \begin{cases}
    \frac{(s^*-s)(p_s-w_f)}{2}\phi &\iff w_f > p_s - \frac{\tau s^*}{\phi}, \\
    \frac{\tau(s^*)^2}{2} &\text{ otherwise }
 \end{cases}
$$

and

$$
 I_{high} = 
 \begin{cases}
    \frac{[1-s^*-(1-s)](w_f-p_s)}{2}\phi &\iff w_f < p_s + \frac{\tau s^*}{\phi}, \\
    \frac{\tau(1-s^*)^2}{2} &\text{ otherwise }
 \end{cases}
$$

Literature:
- Bettio & Villa (1998), De Silva & Tenreyro (2020) 
- [**Education Fever**]  Anderson & Kohler (2013), Kim & Tertilt & Yum (2021), Gauthier (2015), Myong & Park & Yi (2020), Fernández & Fogli (2006, 2009).


<!-- ## Barganing over Fertility

Instead of a single decision maker, we model fertility as a joint decision taken by the mother and father. Children are likely to be born only if both partners desire to have a baby, implying that a “veto” from one of the potential parents is sufficient to block the decision.

There are two partners f and m deciding whether to have a single child $n \in \{0,1\}$. Utility is linear
$$
 u_g (c_g, n) = c_g + \nu_g n \ \text{ where $g\in \{f,m\}$ }
$$ -->
