#pragma once

#include "Packet.h"

namespace SpaceMedia 
{
  typedef void (*OnHeaderParsed)();
  typedef void (*OnPacketParsed)(Packet packet);

  class Demuxer
  {
    public:
      OnHeaderParsed& onHeaderParsed() { return m_onHeaderParsed; }
      OnPacketParsed& onPacketParsed() { return m_onPacketParsed; }

      virtual void demux() = 0;
      virtual void dispose();

    private:
      OnHeaderParsed m_onHeaderParsed;
      OnPacketParsed m_onPacketParsed;
  };
}